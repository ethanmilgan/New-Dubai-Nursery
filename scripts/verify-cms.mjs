import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {projectId, dataset, apiVersion} from '../sanity/project.js';
const pages = JSON.parse(await fs.readFile(new URL('../content/pages.json', import.meta.url), 'utf8'));
const library = JSON.parse(await fs.readFile(new URL('../content/photo-library.json', import.meta.url), 'utf8'));
const query = '{"photos": *[_type == "nurseryPhoto"]{_id, alt, image}, "pages": *[_type == "nurseryPage"]{_id, slug, copy, photos[]{slot, photo->{_id, image}}}, "settings": *[_id == "nurserySettings"][0]{phone, email, forms[]{name, "url": document.asset->url}}}';
const response = await fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?perspective=published&query=${encodeURIComponent(query)}`);
assert.equal(response.status, 200, 'Published content must be readable without credentials');
const {result} = await response.json();
for (const photo of library) {
  const saved = result.photos.find(item => item._id === `nurseryPhoto-${photo.id}`);
  assert.ok(saved?.image?.asset?._ref, `Missing uploaded image: ${photo.id}`);
  assert.ok(saved.alt, `Missing image description: ${photo.id}`);
}
for (const page of pages) {
  const saved = result.pages.find(item => item.slug === page.slug);
  assert.ok(saved, `Missing page: ${page.slug}`);
  for (const position of page.photos) assert.ok(saved.photos.find(item => item.slot === position.slot)?.photo?.image?.asset?._ref, `Broken photo reference: ${page.slug}/${position.slot}`);
  for (const text of page.copy) assert.equal(typeof saved.copy.find(item => item.key === text.key)?.value, 'string', `Missing wording: ${page.slug}/${text.key}`);
}
const usedAssets = result.pages.flatMap(page => page.photos.map(position => position.photo.image.asset._ref));
assert.equal(new Set(usedAssets).size, usedAssets.length, 'A photograph is repeated on the website');
assert.ok(result.settings.phone && result.settings.email, 'Missing nursery settings');
assert.equal(result.settings.forms.length, 5);
for (const form of result.settings.forms) {
  assert.match(form.url, /^https:\/\/cdn\.sanity\.io\/files\/jkg6va26\/production\//);
  const response = await fetch(form.url, {method: 'HEAD'});
  assert.equal(response.status, 200, `Missing PDF: ${form.name}`);
}
console.log(`Verified public CMS: ${library.length} photos, ${pages.length} pages, ${pages.reduce((n,p)=>n+p.photos.length,0)} image positions and 5 PDFs.`);
if (process.env.SITE_URL) {
  const imageUrls = new Set();
  for (const page of pages) {
    const response = await fetch(new URL(page.slug === 'home' ? '/' : `/${page.slug}`, process.env.SITE_URL));
    const html = await response.text();
    assert.equal(response.status, 200, `Page failed: ${page.slug}`);
    assert.ok(html.includes('cdn.sanity.io'), `Page is not using CMS assets: ${page.slug}`);
    assert.ok(!html.includes('SANITY_AUTH_TOKEN'), 'Unexpected token label in public HTML');
    for (const match of html.matchAll(/<img\b[^>]*?\bsrc="([^"]+)"/g)) imageUrls.add(match[1].replaceAll('&amp;', '&'));
    console.log(`Verified page: ${page.slug}`);
  }
  const response = await fetch(new URL('/studio', process.env.SITE_URL));
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /noindex/);
  assert.ok(!html.includes('Primary navigation'), 'Public navigation leaked into Studio');
  console.log('Verified Studio route and search-engine exclusion.');
  const pending = [...imageUrls];
  await Promise.all(Array.from({length:4}, async () => {
    while (pending.length) {
      const image = pending.pop();
      const response = await fetch(new URL(image, process.env.SITE_URL));
      assert.equal(response.status, 200, `Image failed to load: ${image}`);
      assert.match(response.headers.get('content-type'), /^image\//);
      await response.arrayBuffer();
    }
  }));
  console.log(`Verified ${imageUrls.size} rendered image URLs.`);
}
