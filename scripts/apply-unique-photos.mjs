import fs from 'node:fs/promises';
import {getCliClient} from 'sanity/cli';
import {projectId, dataset, apiVersion} from '../sanity/project.js';
const pages = JSON.parse(await fs.readFile(new URL('../content/pages.json', import.meta.url), 'utf8'));
const library = JSON.parse(await fs.readFile(new URL('../content/photo-library.json', import.meta.url), 'utf8'));
const client = getCliClient({apiVersion}).withConfig({projectId, dataset, useCdn: false});
const positions = pages.flatMap(page => page.photos);
if (new Set(positions.map(position => position.photoId)).size !== positions.length) throw new Error('Repeated local assignments');
const records = await client.getDocuments(pages.map(page => page._id));
const assets = await client.fetch('*[_type == "nurseryPhoto"]{_id, "asset": image.asset._ref}');
const assignedAssets = positions.map(position => assets.find(asset => asset._id === `nurseryPhoto-${position.photoId}`)?.asset);
if (assignedAssets.some(asset => !asset) || new Set(assignedAssets).size !== positions.length) throw new Error('Missing or repeated Sanity image assets');
if (!process.argv.includes('--write')) {
  console.log(`Validated ${positions.length} unique assignments. Add --write to apply them.`);
  process.exit(0);
}
let transaction = client.transaction();
for (const page of pages) {
  const current = records.find(record => record?._id === page._id);
  if (!current) throw new Error(`Missing page ${page.title}`);
  const next = current.photos.map(position => {
    const selected = page.photos.find(item => item.slot === position.slot);
    if (!selected) return position;
    return {...position, photo: {_type:'reference', _ref:`nurseryPhoto-${selected.photoId}`}};
  });
  transaction = transaction.patch(page._id, patch => patch.ifRevisionId(current._rev).set({photos:next}));
}
await transaction.commit();
for(const photo of library) await client.patch(`nurseryPhoto-${photo.id}`).set({suggestedPlacements:photo.placements}).commit();
console.log(`Saved ${positions.length} unique photo assignments; page wording and captions preserved.`);
