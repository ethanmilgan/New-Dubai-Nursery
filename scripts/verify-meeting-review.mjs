import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const review=JSON.parse(await fs.readFile('content/meeting-review.json','utf8'));
const testimonials=JSON.parse(await fs.readFile('content/testimonials.json','utf8'));
const pages=JSON.parse(await fs.readFile('content/pages.json','utf8'));
const library=JSON.parse(await fs.readFile('content/photo-library.json','utf8'));
const used=pages.flatMap(p=>p.photos.map(pos=>pos.photoId));
assert.equal(new Set(used).size,used.length,'Repeated local photo assignments');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#x27;');
for(const page of pages){
 const html=await fs.readFile(`out/${page.slug==='home'?'':page.slug+'/'}index.html`,'utf8');
 const markup=html.replace(/<script\b[\s\S]*?<\/script>/g,'');
 for(const change of review.changes.filter(c=>c.slug===page.slug)){
  // text-33 is intentionally retained in the CMS but its duplicate hero button is removed.
  if(page.slug==='home'&&change.key==='text-33')continue;
  assert.ok(markup.includes(escape(change.value.trim())),`Missing rendered wording: ${page.slug}/${change.key}`);
 }
 for(const {photo} of review.newPhotos.filter(p=>p.slug===page.slug)){
  assert.ok(markup.includes(escape(photo.alt)),`Missing rendered photo: ${photo.id}`);
  await fs.stat(`public${photo.src}`);
 }
 if(['home','about','curriculum','admissions'].includes(page.slug))assert.equal((markup.match(/>Book a Visit /g)||[]).length,2,`Unexpected visit buttons: ${page.slug}`);
 if(page.slug==='home'){
  assert.ok(markup.includes(escape(testimonials[0].quote)),'Missing initial testimonial');
  const serialized=html.replaceAll('\\u0026','&');
  for(const entry of testimonials)assert.ok(serialized.includes(entry.name)||html.includes(escape(entry.name)),`Missing slider testimonial: ${entry.name}`);
 }
 for(const position of page.photos)assert.ok(library.some(p=>p.id===position.photoId),`Missing fallback: ${position.photoId}`);
}
console.log(`Verified rendered meeting changes: ${review.changes.length} wording edits, ${review.newPhotos.length} photos, ${testimonials.length} testimonials and ${used.length} unique image positions.`);
