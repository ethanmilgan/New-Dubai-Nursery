import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {getCliClient} from 'sanity/cli';
import {projectId, dataset, apiVersion} from '../sanity/project.js';

// Group entries that form one heading across line breaks or emphasis spans.
const groups = {
  home: [[2],[5],[8],[10],[12],[14],[16],[28,29],[30,31],[49,50],[55,56],[60,61],[66],[67,68],[75],[76],[83,84],[86],[88],[90],[94,95],[97]],
  about: [[1],[3],[5],[7],[9],[11],[14,15],[18],[19,20],[30,31],[33,34,35],[37],[39],[42],[43],[52]],
  admissions: [[11,12,13],[15],[17],[19],[23,24],[26],[28],[29],[34,35],[37],[38],[40,41],[45]],
  curriculum: [[1],[3],[5],[7],[10,11,12],[15],[16],[20,21],[25,26],[28],[29], ...Array.from({length:7},(_,i)=>[`learning-title-${i}`])],
  contact: [[2,3],[8,9,10],[15,16],[22],[26],[27],[29],[31]],
};
const minor = new Set('a an the and but or nor for so yet as at by in of on per to up via with from into onto over than through under until upon within without'.split(' '));
function updatesFor(page) {
  const updates = new Map();
  for (const group of groups[page.slug] ?? []) {
    let first = true;
    for (const id of group) {
      const key = typeof id === 'number' ? `text-${id}` : id;
      const entry = page.copy.find(item=>item.key===key);
      assert.ok(entry, `Missing heading: ${page.slug}/${key}`);
      const value = entry.value.replace(/[\p{L}\p{N}]+(?:[’'][\p{L}\p{N}]+)*/gu, word => {
        const lower = word.toLowerCase();
        const result = !first && minor.has(lower) ? lower : word[0].toUpperCase()+word.slice(1);
        first = false;
        return result;
      });
      if (value !== entry.value) updates.set(entry._key, value);
    }
  }
  return updates;
}
const client = getCliClient({apiVersion}).withConfig({projectId,dataset,useCdn:false,perspective:'raw'});
const pages = await client.fetch('*[_type=="nurseryPage"]');
let tx = client.transaction();
let count = 0;
for (const page of pages) {
  const updates = updatesFor(page);
  const set = {};
  for (const [key,value] of updates) {
    console.log(`${page._id}/${key}: ${value}`);
    set[`copy[_key==${JSON.stringify(key)}].value`] = value;
  }
  if (updates.size) tx = tx.patch(page._id,p=>p.ifRevisionId(page._rev).set(set));
  count += updates.size;
}
if (process.argv.includes('--write')) {
  if (count) await tx.commit();
  const saved = await client.fetch('*[_type=="nurseryPage"]');
  for (const page of saved) assert.equal(updatesFor(page).size,0,`Heading verification failed: ${page._id}`);
  const file = new URL('../content/pages.json',import.meta.url);
  const defaults = JSON.parse(await fs.readFile(file,'utf8'));
  for (const page of defaults) {
    const updates = updatesFor(page);
    for (const entry of page.copy) if (updates.has(entry._key)) entry.value=updates.get(entry._key);
  }
  await fs.writeFile(file,JSON.stringify(defaults,null,2)+'\n');
  console.log(`Saved and verified ${count} heading entries; local fallback headings updated.`);
} else console.log(`Preview: ${count} heading entries. Add --write to apply.`);
