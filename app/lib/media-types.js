const contentTypes = {
  avif: "image/avif",
  gif: "image/gif",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  pdf: "application/pdf",
  png: "image/png",
  svg: "image/svg+xml",
  webp: "image/webp"
};

export function getContentType(filename) {
  const extension = String(filename || "").split(".").pop()?.toLowerCase();
  return contentTypes[extension] || "application/octet-stream";
}

export function getMediaKind(contentType) {
  return contentType.startsWith("image/") ? "image" : "document";
}
