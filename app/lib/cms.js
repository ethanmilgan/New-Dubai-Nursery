import 'server-only';
import {cache} from 'react';
import {get} from 'node:https';
import {createImageUrlBuilder} from '@sanity/image-url';
import {projectId, dataset, apiVersion} from '@/sanity/project';
import defaults from '@/content/pages.json';
import photos from '@/content/photo-library.json';
import {contact, testimonials, forms} from './site-data';

const builder = createImageUrlBuilder({projectId, dataset});
const localPhotos = new Map(photos.map(photo => [photo.id, photo]));
const query = `{"pages": *[_type == "nurseryPage"]{slug, copy, photos[]{slot, caption, photo->{alt, image}}}, "settings": *[_id == "nurserySettings"][0]{..., tour{title, "url": video.asset->url, "poster": poster.asset->url, "captions": captions.asset->url}, forms[]{name, "url": document.asset->url}}}`;
// Bypass Next's persistent fetch cache so every CMS-triggered build reads the
// latest published data, even when Cloudflare restores its build cache.
function readPublishedContent(url) {
  return new Promise((resolve, reject) => {
    const request = get(url, response => {
      if (response.statusCode !== 200) {
        response.resume();
        reject(new Error(`CMS HTTP ${response.statusCode}`));
        return;
      }
      let body = '';
      response.setEncoding('utf8');
      response.on('data', chunk => { body += chunk; });
      response.on('error', reject);
      response.on('end', () => {
        try { resolve(JSON.parse(body)); } catch (error) { reject(error); }
      });
    });
    request.setTimeout(10000, () => request.destroy(new Error('CMS request timed out')));
    request.on('error', reject);
  });
}
export const getContent = cache(async () => {
  try {
    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?perspective=published&query=${encodeURIComponent(query)}`;
    const {result} = await readPublishedContent(url);
    if (!Array.isArray(result?.pages) || result.pages.length === 0 || !result.settings) {
      throw new Error('CMS response is missing published pages or nursery settings');
    }
    return result || {};
  } catch (error) {
    // A failed production rebuild must retain the last successful deployment,
    // rather than publishing stale fallback content over the editor's changes.
    if (process.env.NODE_ENV === 'production') throw error;
    console.error('CMS unavailable; using local nursery content.', error.message);
    return {};
  }
});

export async function getPageContent(slug) {
  const content = await getContent();
  const saved = content.pages?.find(page => page.slug === slug);
  const original = defaults.find(page => page.slug === slug);
  const wording = new Map((saved?.copy || []).map(entry => [entry.key, entry.value]));
  const t = (key, fallback) => typeof wording.get(key) === 'string' ? wording.get(key) : fallback;
  const photo = (slot) => {
    const position = original.photos.find(item => item.slot === slot);
    const fallback = localPhotos.get(position.photoId);
    const selected = saved?.photos?.find(item => item.slot === slot);
    let src = fallback.src;
    if (selected?.photo?.image?.asset) {
      try { src = builder.image(selected.photo.image).width(1600).auto('format').url(); } catch { /* Retain local photo if an incomplete edit was published. */ }
    }
    const focus = selected?.photo?.image?.hotspot || fallback.focus;
    return {src, alt: selected?.photo?.alt || fallback.alt, caption: selected?.caption ?? position.caption, style: {objectPosition: focus ? `${focus.x * 100}% ${focus.y * 100}%` : 'center'}};
  };
  return {t, photo};
}

export async function getSettings() {
  const saved = (await getContent()).settings;
  const merged = {...contact};
  for (const key of Object.keys(contact)) if (typeof saved?.[key] === 'string' && saved[key]) merged[key] = saved[key];
  merged.phoneHref = `tel:${merged.phone.replace(/[^+\d]/g, '')}`;
  merged.whatsappHref = `https://wa.me/${merged.whatsapp.replace(/\D/g, '')}`;
  merged.emailHref = `mailto:${merged.email}`;
  return {contact: merged, tour: saved?.tour?.url ? saved.tour : null, testimonials: saved?.testimonials?.length ? saved.testimonials : testimonials, forms: saved?.forms?.filter(form => form.name && form.url) ?? forms.map(form => ({...form, url: `/forms/${form.file}`}))};
}
