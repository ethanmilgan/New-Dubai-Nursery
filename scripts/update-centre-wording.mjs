import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {getCliClient} from 'sanity/cli';
import {projectId,dataset,apiVersion} from '../sanity/project.js';
import {centreWording,brandMentions} from './lib/centre-wording.mjs';

function updatesFor(doc){
 const set={};
 const update=(field,value)=>{
  if(typeof value!=='string')return;
  const next=centreWording(value);
  assert.deepEqual(brandMentions(next),brandMentions(value),`Brand changed: ${doc._id}/${field}`);
  if(next!==value)set[field]=next;
 };
 if(doc._type==='nurseryPage'){
  for(const entry of doc.copy??[])update(`copy[_key==${JSON.stringify(entry._key)}].value`,entry.value);
  for(const pos of doc.photos??[])update(`photos[_key==${JSON.stringify(pos._key)}].caption`,pos.caption);
 }
 if(doc._type==='nurseryPhoto')update('alt',doc.alt);
 if(doc._type==='nurserySettings'){
  update('tour.title',doc.tour?.title);
  for(const entry of doc.testimonials??[])for(const key of ['quote','fullQuote','role'])update(`testimonials[_key==${JSON.stringify(entry._key)}].${key}`,entry[key]);
 }
 return set;
}
const client=getCliClient({apiVersion}).withConfig({projectId,dataset,useCdn:false,perspective:'raw'});
const query='*[_type in ["nurseryPage","nurseryPhoto","nurserySettings"] && !(_id in path("versions.**"))]';
const docs=await client.fetch(query),plans=docs.map(doc=>({doc,set:updatesFor(doc)})).filter(p=>Object.keys(p.set).length);
console.log(`Review: ${plans.reduce((n,p)=>n+Object.keys(p.set).length,0)} wording fields in ${plans.length} CMS documents.`);
for(const {doc,set} of plans)for(const [key,value] of Object.entries(set))console.log(`${doc._id}/${key}: ${value}`);
if(process.argv.includes('--write')){
 await fs.mkdir('.photo-review/backups',{recursive:true});
 await fs.writeFile(`.photo-review/backups/centre-wording-${Date.now()}.json`,JSON.stringify(docs,null,2));
 let tx=client.transaction();
 for(const {doc,set} of plans)tx=tx.patch(doc._id,p=>p.ifRevisionId(doc._rev).set(set));
 if(plans.length)await tx.commit();
 for(const doc of await client.fetch(query))assert.equal(Object.keys(updatesFor(doc)).length,0,`Unchanged generic wording: ${doc._id}`);
 console.log('Saved and verified generic terminology. All New Dubai Nursery name mentions preserved.');
}else console.log('Dry run. Add --write to apply.');
