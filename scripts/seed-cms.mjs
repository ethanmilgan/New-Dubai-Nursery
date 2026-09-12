import fs from 'node:fs/promises';
import {getCliClient} from 'sanity/cli';
import {projectId, dataset, apiVersion} from '../sanity/project.js';
import {contact, testimonials, forms} from '../app/lib/site-data.js';

const library = JSON.parse(await fs.readFile(new URL('../content/photo-library.json', import.meta.url), 'utf8'));
const pages = JSON.parse(await fs.readFile(new URL('../content/pages.json', import.meta.url), 'utf8'));
const client = getCliClient({apiVersion}).withConfig({projectId, dataset, useCdn: false});
if (!process.argv.includes('--write')) {
  console.log(`Ready to import ${library.length} photos, ${pages.length} pages, ${forms.length} forms and nursery settings into ${projectId}/${dataset}. Add --write to save.`);
  process.exit(0);
}
// Use stable IDs and createIfNotExists: repeating the seed preserves staff edits.
for (const photo of library) {
  const id = `nurseryPhoto-${photo.id}`;
  if (await client.getDocument(id)) { console.log(`Preserved ${id}`); continue; }
  const asset = await client.assets.upload('image', await fs.readFile(new URL(`../public${photo.src}`, import.meta.url)), {filename: `${photo.id}.webp`, contentType: 'image/webp'});
  await client.createIfNotExists({_id: id, _type: 'nurseryPhoto', title: photo.id.replaceAll('-', ' '), alt: photo.alt, category: photo.category, image: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}, ...(photo.focus ? {hotspot:{_type:'sanity.imageHotspot', ...photo.focus, width:0.4, height:0.4}} : {})}, suggestedPlacements: photo.placements, sourceArchive: photo.sourceArchive, sourcePath: photo.sourcePath, selectionReason: photo.selectionReason});
  console.log(`Saved ${id}`);
}
for (const page of pages) {
  await client.createIfNotExists({...page, photos: page.photos.map(({photoId, ...position}) => ({...position, _type: 'photoPosition', photo: {_type: 'reference', _ref: `nurseryPhoto-${photoId}`}}))});
  console.log(`Saved or preserved ${page.title}`);
}
if (!(await client.getDocument('nurserySettings'))) {
  const documents = [];
  for (const [index, form] of forms.entries()) {
    const asset = await client.assets.upload('file', await fs.readFile(new URL(`../public/forms/${form.file}`, import.meta.url)), {filename: form.file, contentType: 'application/pdf'});
    documents.push({_key:`form-${index}`, _type:'admissionForm', name:form.name, document:{_type:'file',asset:{_type:'reference',_ref:asset._id}}});
  }
  await client.createIfNotExists({_id:'nurserySettings',_type:'nurserySettings',...contact, testimonials:testimonials.map((item,index)=>({...item,_type:'testimonial',_key:`testimonial-${index}`})), forms:documents});
}
const result = await client.fetch('{"photos": count(*[_type == "nurseryPhoto"]), "pages": count(*[_type == "nurseryPage"]), "settings": defined(*[_id == "nurserySettings"][0])}');
if (result.photos < library.length || result.pages < pages.length || !result.settings) throw new Error('Import verification failed');
console.log('Verified saved content:', result);
