# Database-backed media

The website serves images and downloadable documents from MongoDB through stable URLs:

```text
/api/media/assets/logo_ii.png
/api/media/forms/ADMISSION-FORM.pdf
```

## Collection format

Collection: `mediaAssets`

```js
{
  _id: ObjectId,
  key: "assets/logo_ii.png",       // unique, stable public identifier
  kind: "image",                   // image | document
  category: "assets",              // assets | forms
  filename: "logo_ii.png",
  contentType: "image/png",
  size: 15425,
  altText: "",
  sha256: "...",                   // content fingerprint and HTTP ETag
  data: Binary,                     // BSON binary, not base64
  managedBy: "seed",
  createdAt: Date,
  updatedAt: Date
}
```

Binary BSON is smaller and simpler than base64. MongoDB's 16 MB document limit is appropriate for the current files, whose largest item is well below that limit. For future large videos or files over roughly 10 MB, use object storage or GridFS and retain the same `key` metadata model.

## Setup

1. Copy `.env.example` to `.env.local`.
2. Set `MONGODB_URI` and optionally `MONGODB_DB`.
3. Run `npm run db:seed:media`.
4. Run `npm run dev`.

The seed is idempotent. Files are updated only when their SHA-256 changes, and deleted seed-managed records are removed from the collection.

`MEDIA_LOCAL_FALLBACK=true` is intended only for local development. Production should omit it so a missing database record returns `404` instead of reading from disk.
