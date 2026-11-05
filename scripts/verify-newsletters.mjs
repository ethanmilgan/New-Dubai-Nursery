import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {projectId,dataset,apiVersion} from '../sanity/project.js';
import {newsletterGroups} from '../content/newsletters.js';

const query=`*[_id=="nurserySettings"][0].newsletters{${newsletterGroups.map(group=>`"${group.key}": ${group.key}.asset->{url,mimeType}`).join(',')}}`;
const response=await fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?perspective=published&query=${encodeURIComponent(query)}`);
assert.equal(response.status,200);
const {result}=await response.json();
const html=await fs.readFile('out/index.html','utf8');
for(const group of newsletterGroups){
 const file=result?.[group.key];
 assert.equal(file?.mimeType,'application/pdf',`Wrong file type: ${group.age}`);
 assert.ok(file.url.startsWith(`https://cdn.sanity.io/files/${projectId}/${dataset}/`));
 const head=await fetch(file.url,{method:'HEAD'});
 assert.equal(head.status,200,`Missing PDF: ${group.age}`);
 assert.match(head.headers.get('content-type'),/application\/pdf/);
 const anchor=[...html.matchAll(/<a\b[^>]*>/g)].map(m=>m[0]).find(a=>a.includes(`href="${file.url}"`));
 assert.ok(anchor,`Export does not use the CMS newsletter: ${group.age}`);
 assert.ok(anchor.includes(`${group.age} newsletter`),`Wrong card mapping: ${group.age}`);
 assert.ok(anchor.includes('target="_blank"'));
 assert.equal((await fs.readFile(`public/newsletters/${group.file}`)).subarray(0,5).toString(),'%PDF-');
 console.log(`Verified ${group.age}: published CMS PDF, accessible asset, matching home-page link and local fallback.`);
}
