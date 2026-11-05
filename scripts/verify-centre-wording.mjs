import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {hasGenericNursery} from './lib/centre-wording.mjs';

const decode=text=>text.replace(/&nbsp;/g,' ').replace(/&#x27;|&#39;/g,"'").replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/\s+/g,' ');
const baseUrl=process.argv[2];
for(const slug of ['','about','curriculum','admissions','contact']){
 let html;
 if(baseUrl){const response=await fetch(new URL(slug?`/${slug}/`:'/',baseUrl));assert.equal(response.status,200,`Page failed: /${slug}`);html=await response.text();}
 else html=await fs.readFile(`out/${slug?slug+'/':''}index.html`,'utf8');
 const markup=html.replace(/<script\b[\s\S]*?<\/script>/gi,'').replace(/<style\b[\s\S]*?<\/style>/gi,'');
 const visible=decode(markup.replace(/<[^>]*>/g,' '));
 assert.ok(visible.includes('New Dubai Nursery'),`Brand name missing: /${slug}`);
 assert.ok(!hasGenericNursery(visible),`Generic nursery in visible text: /${slug}`);
 for(const match of markup.matchAll(/\b(?:alt|aria-label|title|content)="([^"]*)"/g))assert.ok(!hasGenericNursery(decode(match[1])),`Generic nursery in metadata or accessible text: /${slug}: ${match[1]}`);
 console.log(`Verified /${slug}: brand name retained; no generic nursery in rendered wording, metadata or accessible descriptions.`);
}
const testimonials=JSON.parse(await fs.readFile('content/testimonials.json','utf8'));
for(const entry of testimonials){for(const key of ['quote','fullQuote','role'])assert.ok(!hasGenericNursery(entry[key]||''));assert.ok(entry.fullQuote.includes(entry.quote));}
console.log('Verified all six testimonial excerpts and full letters.');
