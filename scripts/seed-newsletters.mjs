import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {getCliClient} from 'sanity/cli';
import {projectId,dataset,apiVersion} from '../sanity/project.js';
import {newsletterGroups} from '../content/newsletters.js';

const client=getCliClient({apiVersion}).withConfig({projectId,dataset,useCdn:false,perspective:'raw'});
const docs=await client.fetch('*[_id in ["nurserySettings","drafts.nurserySettings"]]');
assert.ok(docs.some(doc=>doc._id==='nurserySettings'),'Missing nursery settings');
const missing=new Set(docs.flatMap(doc=>newsletterGroups.filter(group=>!doc.newsletters?.[group.key]?.asset?._ref).map(group=>group.key)));
console.log(`Newsletter import: ${missing.size} age groups need files across ${docs.length} settings documents.`);
if(process.argv.includes('--write')&&missing.size){
 await fs.mkdir('.photo-review/backups',{recursive:true});
 await fs.writeFile(`.photo-review/backups/newsletters-${Date.now()}.json`,JSON.stringify(docs,null,2));
 const files={};
 for(const group of newsletterGroups.filter(group=>missing.has(group.key))){
  const bytes=await fs.readFile(new URL(`../public/newsletters/${group.file}`,import.meta.url));
  assert.equal(bytes.subarray(0,5).toString(),'%PDF-');
  const asset=await client.assets.upload('file',bytes,{filename:group.file,contentType:'application/pdf'});
  files[group.key]={_type:'file',asset:{_type:'reference',_ref:asset._id}};
 }
 let tx=client.transaction();
 for(const doc of docs){
  const set={};
  for(const group of newsletterGroups)if(!doc.newsletters?.[group.key]?.asset?._ref)set[`newsletters.${group.key}`]=files[group.key];
  if(Object.keys(set).length)tx=tx.patch(doc._id,p=>p.ifRevisionId(doc._rev).setIfMissing({newsletters:{_type:'object'}}).set(set));
 }
 await tx.commit();
}
if(process.argv.includes('--write')){
 const saved=await client.getDocument('nurserySettings');
 for(const group of newsletterGroups)assert.ok(saved.newsletters?.[group.key]?.asset?._ref,`Missing newsletter: ${group.age}`);
 console.log('All three published newsletter references verified. Existing editor selections preserved.');
}else console.log('Dry run. Add --write to upload missing newsletters.');
