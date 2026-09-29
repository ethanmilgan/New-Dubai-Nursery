import assert from 'node:assert/strict';
import {getCliClient} from 'sanity/cli';
import {projectId, dataset, apiVersion} from '../sanity/project.js';
import {schemaTypes} from '../sanity/schema.js';

const client = getCliClient({apiVersion}).withConfig({projectId, dataset, useCdn: false, perspective: 'raw'});
const fields = new Set(schemaTypes.find(type => type.name === 'nurserySettings').fields.map(field => field.name));
const derived = ['phoneHref', 'whatsappHref', 'emailHref'];
const docs = await client.fetch('*[_type == "nurserySettings"]');
for (const doc of docs) {
  const unknown = Object.keys(doc).filter(key => !key.startsWith('_') && !fields.has(key));
  console.log(doc._id, 'Undefined fields:', unknown);
  assert.ok(unknown.every(key => derived.includes(key)), 'Unexpected fields found; review before changing content');
  if (!unknown.length || !process.argv.includes('--write')) continue;
  // Preserve every editorial field and refuse to overwrite concurrent edits.
  const repaired = await client.patch(doc._id).ifRevisionId(doc._rev).unset(unknown).commit();
  for (const key of Object.keys(doc).filter(key => !key.startsWith('_') && !unknown.includes(key))) {
    assert.deepEqual(repaired[key], doc[key], `Content changed: ${key}`);
  }
  assert.ok(Object.keys(repaired).every(key => key.startsWith('_') || fields.has(key)));
  console.log('Repaired; all editorial content preserved:', doc._id);
}
