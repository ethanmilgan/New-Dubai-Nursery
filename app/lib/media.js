import { getMongoDb } from "./mongodb";

export const MEDIA_COLLECTION = "mediaAssets";

export function normalizeMediaKey(value) {
  const key = String(value || "").replaceAll("\\", "/").replace(/^\/+|\/+$/g, "");

  if (!key || key.length > 240 || key.includes("..") || !/^[a-zA-Z0-9._\-/]+$/.test(key)) {
    return "";
  }

  return key;
}

export async function getMediaAssetByKey(value) {
  const key = normalizeMediaKey(value);
  if (!key) return null;

  const db = await getMongoDb();
  if (!db) return null;

  return db.collection(MEDIA_COLLECTION).findOne({ key });
}

export function getMediaBytes(asset) {
  if (!asset?.data) return null;
  if (Buffer.isBuffer(asset.data)) return asset.data;
  if (typeof asset.data.value === "function") return Buffer.from(asset.data.value(true));
  if (asset.data.buffer) return Buffer.from(asset.data.buffer);
  if (typeof asset.data === "string") return Buffer.from(asset.data, "base64");
  return null;
}
