import fs from 'node:fs';
import assert from 'node:assert/strict';
import {getCliClient} from 'sanity/cli';
import {projectId,dataset,apiVersion} from '../sanity/project.js';

const [videoPath,posterPath] = process.argv.slice(2);
if (!videoPath || !posterPath) throw new Error('Provide an optimized MP4 and a preview image.');
const client = getCliClient({apiVersion}).withConfig({projectId,dataset,useCdn:false,perspective:'raw'});
const docs = await client.fetch('*[_id in ["nurserySettings", "drafts.nurserySettings"]]');
assert.ok(docs.some(doc=>doc._id==='nurserySettings'));
const video = await client.assets.upload('file',fs.createReadStream(videoPath),{filename:'nursery-tour.mp4',contentType:'video/mp4'});
console.log('Video uploaded');
const poster = await client.assets.upload('image',fs.createReadStream(posterPath),{filename:'nursery-tour-preview.jpg',contentType:'image/jpeg'});
let tx=client.transaction();
for(const doc of docs) {
  assert.ok(!doc.tour, 'An existing tour needs review before replacement.');
  tx=tx.patch(doc._id,p=>p.ifRevisionId(doc._rev).set({tour:{_type:'tour',title:'Take a Look Around Our Nursery',video:{_type:'file',asset:{_type:'reference',_ref:video._id}},poster:{_type:'image',asset:{_type:'reference',_ref:poster._id}}}}));
}
await tx.commit();
const saved=await client.fetch('*[_id=="nurserySettings"][0].tour');
assert.equal(saved.video.asset._ref,video._id);
assert.equal(saved.poster.asset._ref,poster._id);
console.log('Tour and preview saved and verified.');
