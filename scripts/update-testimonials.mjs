import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {getCliClient} from 'sanity/cli';
import {projectId,dataset,apiVersion} from '../sanity/project.js';

const entries=JSON.parse(await fs.readFile(new URL('../content/testimonials.json',import.meta.url),'utf8'));
for(const entry of entries){assert.ok(entry.name&&entry.quote);if(entry.fullQuote)assert.ok(entry.fullQuote.includes(entry.quote),`Excerpt does not match full letter: ${entry.name}`);}
const client=getCliClient({apiVersion}).withConfig({projectId,dataset,useCdn:false,perspective:'raw'});
const docs=await client.fetch('*[_id in ["nurserySettings","drafts.nurserySettings"]]');
assert.ok(docs.some(d=>d._id==='nurserySettings'));
const testimonials=entries.map((entry,index)=>({_key:`appreciation-${index+1}`,_type:'testimonial',...entry}));
console.log(`Prepared ${testimonials.length} testimonials with full letters.`);
if(process.argv.includes('--write')){
 await fs.mkdir('.photo-review/backups',{recursive:true});
 await fs.writeFile(`.photo-review/backups/testimonials-${Date.now()}.json`,JSON.stringify(docs,null,2));
 let tx=client.transaction();
 for(const doc of docs)tx=tx.patch(doc._id,p=>p.ifRevisionId(doc._rev).set({testimonials}));
 await tx.commit();
 assert.deepEqual((await client.getDocument('nurserySettings')).testimonials,testimonials);
 console.log('Saved and verified all six excerpts, full letters and parent names.');
}else console.log('Dry run. Add --write to apply.');
