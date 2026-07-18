import { readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { getMediaAssetByKey, getMediaBytes, normalizeMediaKey } from "@/app/lib/media";
import { getContentType } from "@/app/lib/media-types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function getDevelopmentFallback(key) {
  const allowFallback = process.env.MEDIA_LOCAL_FALLBACK === "true" || process.env.NODE_ENV === "development";
  if (!allowFallback) return null;

  const sourceRoot = resolve(process.cwd(), "media-source");
  const filePath = resolve(sourceRoot, ...key.split("/"));
  if (!filePath.startsWith(sourceRoot + sep)) return null;

  try {
    const data = await readFile(filePath);
    return { data, contentType: getContentType(filePath), filename: key.split("/").at(-1), sha256: "development" };
  } catch {
    return null;
  }
}

export async function GET(request, { params }) {
  const { key: segments } = await params;
  const key = normalizeMediaKey(Array.isArray(segments) ? segments.join("/") : segments);

  if (!key) {
    return Response.json({ error: "Invalid media key." }, { status: 400 });
  }

  let asset;
  try {
    asset = await getMediaAssetByKey(key);
  } catch (error) {
    console.error("Unable to read media from MongoDB", error);
  }

  const bytes = getMediaBytes(asset);
  const media = bytes
    ? { data: bytes, contentType: asset.contentType, filename: asset.filename, sha256: asset.sha256 }
    : await getDevelopmentFallback(key);

  if (!media) {
    return Response.json({ error: "Media asset was not found." }, { status: 404 });
  }

  const etag = `"${media.sha256}"`;
  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, { status: 304, headers: { ETag: etag } });
  }

  return new Response(media.data, {
    headers: {
      "Cache-Control": media.sha256 === "development" ? "no-store" : "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Disposition": `inline; filename="${String(media.filename).replace(/[\r\n"]/g, "")}"`,
      "Content-Length": String(media.data.length),
      "Content-Security-Policy": "default-src 'none'; script-src 'none'; sandbox",
      "Content-Type": media.contentType,
      ETag: etag,
      "X-Content-Type-Options": "nosniff"
    }
  });
}
