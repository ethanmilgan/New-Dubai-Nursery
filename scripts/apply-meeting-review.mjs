import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {getCliClient} from 'sanity/cli';
import {projectId,dataset,apiVersion} from '../sanity/project.js';

// Run with: sanity exec scripts/apply-meeting-review.mjs --with-user-token -- [--write]
// The reviewed manifest contains only the approved text and photograph changes.
const manifest=JSON.parse(await fs.readFile(new URL('../content/meeting-review.json',import.meta.url),'utf8'));
const client=getCliClient({apiVersion}).withConfig({projectId,dataset,useCdn:false,perspective:'raw'});
const docs=await client.fetch('*[_type=="nurseryPage"]');
const settings=await client.fetch('*[_type=="nurserySettings" && _id in ["nurserySettings","drafts.nurserySettings"]]');
const testimonials=JSON.parse(await fs.readFile(new URL('../content/testimonials.json',import.meta.url),'utf8')).map((entry,index)=>({_key:`appreciation-${index+1}`,_type:'testimonial',...entry}));
assert.ok(settings.some(s=>s._id==='nurserySettings'),'Missing nursery settings');
const plans=[];
for(const doc of docs){
 const set={};
 for(const change of manifest.changes.filter(c=>c.slug===doc.slug)){
  const entry=doc.copy.find(e=>e.key===change.key);
  assert.ok(entry,`Missing ${doc._id}/${change.key}`);
  assert.ok(entry.value===change.before||entry.value===change.value,`Wording changed since review: ${doc._id}/${change.key}`);
  if(entry.value!==change.value)set[`copy[_key==${JSON.stringify(entry._key)}].value`]=change.value;
 }
 const photos=structuredClone(doc.photos);
 for(const selected of manifest.newPhotos.filter(p=>p.slug===doc.slug)){
  const reference={_type:'reference',_ref:`nurseryPhoto-${selected.photo.id}`};
  const pos=photos.find(p=>p.slot===selected.slot);
  if(pos)pos.photo=reference;
  else photos.push({_key:selected.slot,_type:'photoPosition',slot:selected.slot,label:selected.label,photo:reference});
 }
 if(doc.slug==='home')for(const caption of manifest.captions){const pos=photos.find(p=>p.slot===caption.slot);assert.ok(pos);pos.caption=caption.caption;}
 if(JSON.stringify(photos)!==JSON.stringify(doc.photos))set.photos=photos;
 if(Object.keys(set).length)plans.push({doc,set});
}
console.log(`Review: ${manifest.changes.length} text changes, ${manifest.newPhotos.length} new photos, ${plans.length} page documents.`);
if(!process.argv.includes('--write')){console.log('Dry run complete. Add --write to apply.');}
else {
await fs.mkdir('.photo-review/backups',{recursive:true});
await fs.writeFile(`.photo-review/backups/meeting-pages-${Date.now()}.json`,JSON.stringify(docs,null,2));
await fs.writeFile(`.photo-review/backups/meeting-settings-${Date.now()}.json`,JSON.stringify(settings,null,2));
for(const {photo} of manifest.newPhotos){
 const image=await client.assets.upload('image',await fs.readFile(new URL(`../public${photo.src}`,import.meta.url)),{filename:`${photo.id}.webp`,contentType:'image/webp'});
 const existing=await client.getDocument(`nurseryPhoto-${photo.id}`);
 if(existing){assert.equal(existing.image.asset._ref,image._id,`Photo ID conflict: ${photo.id}`);continue;}
 await client.create({_id:`nurseryPhoto-${photo.id}`,_type:'nurseryPhoto',title:photo.id.split('-').join(' '),alt:photo.alt,category:photo.category,sourcePath:photo.sourcePath,suggestedPlacements:photo.placements,selectionReason:photo.selectionReason,image:{_type:'image',asset:{_type:'reference',_ref:image._id},hotspot:{_type:'sanity.imageHotspot',...photo.focus,width:1,height:1}}});
}
let tx=client.transaction();
for(const {doc,set} of plans)tx=tx.patch(doc._id,p=>p.ifRevisionId(doc._rev).set(set));
for(const doc of settings)tx=tx.patch(doc._id,p=>p.ifRevisionId(doc._rev).set({testimonials}));
await tx.commit();
const saved=await client.fetch('*[_type=="nurseryPage" && !(_id in path("drafts.**"))]{slug,copy,photos[]{slot,caption,photo->{_id,image}}}');
for(const change of manifest.changes)assert.equal(saved.find(p=>p.slug===change.slug).copy.find(e=>e.key===change.key).value,change.value);
for(const change of manifest.newPhotos)assert.equal(saved.find(p=>p.slug===change.slug).photos.find(p=>p.slot===change.slot).photo._id,`nurseryPhoto-${change.photo.id}`);
const refs=saved.flatMap(p=>p.photos.map(pos=>pos.photo.image.asset._ref));
assert.equal(new Set(refs).size,refs.length,'Duplicate image assignments');
assert.deepEqual((await client.getDocument('nurserySettings')).testimonials,testimonials);
console.log(`Saved and verified wording and photos across ${saved.length} pages. Backup saved locally.`);
}
