import test from 'node:test';
import assert from 'node:assert/strict';
import {uniquePhoto, uniqueImageAsset} from '../../sanity/unique-photo.js';

function context(results, photos = [{photo:{_ref:'photo-a'}}]) {
  return {document:{_id:'drafts.nurseryPage-home',photos}, getClient: () => ({withConfig: () => ({fetch: async () => results.shift()})})};
}
test('rejects the same photo in two positions on a page', async () => {
  const ctx=context([], [{photo:{_ref:'photo-a'}},{photo:{_ref:'photo-a'}}]);
  assert.match(await uniquePhoto({_ref:'photo-a'},ctx), /already used elsewhere/);
});
test('rejects a photo assigned to another published page', async () => {
  assert.match(await uniquePhoto({_ref:'photo-a'},context(['asset-a',{localCopies:1,otherPage:'About'}])), /already used on About/);
});
test('rejects different library entries backed by the same image', async () => {
  assert.match(await uniquePhoto({_ref:'photo-a'},context(['asset-a',{localCopies:2}])), /same image/);
});
test('allows an image with a single assignment', async () => {
  assert.equal(await uniquePhoto({_ref:'photo-a'},context(['asset-a',{localCopies:1,otherPage:null}])),true);
});
test('rejects duplicate assets when editing the photo library', async () => {
  assert.match(await uniqueImageAsset({asset:{_ref:'asset-a'}},context(['Reading together'])),/already belongs/);
});
test('does not silently skip validation when the API is unavailable', async () => {
  const ctx={document:{_id:'page'},getClient(){throw new Error('offline');}};
  assert.match(await uniquePhoto({_ref:'photo-a'},ctx),/Unable to check/);
});
