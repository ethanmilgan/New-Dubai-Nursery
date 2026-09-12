import {apiVersion} from './project.js';

export async function uniqueImageAsset(value, context) {
  if (!value?.asset?._ref) return true;
  try {
    const client = context.getClient({apiVersion}).withConfig({perspective:'published'});
    const title = await client.fetch('*[_type == "nurseryPhoto" && _id != $id && image.asset._ref == $asset][0].title', {id:context.document._id.replace(/^drafts\./, ''), asset:value.asset._ref});
    return title ? `This image already belongs to “${title}”. Upload a different photo.` : true;
  } catch { return 'Unable to check duplicate images. Please reconnect before publishing.'; }
}

// Check both document references and the underlying asset so duplicate uploads
// cannot accidentally put the same photograph in two places.
export async function uniquePhoto(value, context) {
  if (!value?._ref) return true; // The required rule handles empty selections.
  const positions = context.document?.photos || [];
  if (positions.filter(item => item.photo?._ref === value._ref).length > 1) return 'This photo is already used elsewhere on this page. Choose a different photo.';
  try {
    const client = context.getClient({apiVersion}).withConfig({perspective: 'published'});
    const asset = await client.fetch('*[_id == $id][0].image.asset._ref', {id: value._ref});
    if (!asset) return true;
    const id = context.document._id.replace(/^drafts\./, '');
    const result = await client.fetch(`{
      "localCopies": count(*[_type == "nurseryPhoto" && _id in $refs && image.asset._ref == $asset]),
      "otherPage": *[_type == "nurseryPage" && _id != $id && count(photos[photo->image.asset._ref == $asset]) > 0][0].title
    }`, {asset, id, refs: positions.map(item => item.photo?._ref).filter(Boolean)});
    if (result.localCopies > 1) return 'Another photo entry on this page uses the same image. Choose a different image.';
    return result.otherPage ? `This image is already used on ${result.otherPage}. Choose a different photo.` : true;
  } catch {
    return 'Unable to check photo reuse. Please reconnect and try again before publishing.';
  }
}
