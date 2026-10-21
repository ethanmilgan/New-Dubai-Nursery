# Nursery content management

The website is connected to the nursery's existing Sanity project: **New Dubai Nursery / Website**, project `jkg6va26`, dataset `production`.

## Staff editor

Open `/studio/` on the deployed website and sign in with the GitHub account that has project access. After `npm run build`, `npm run preview` serves the editor at http://127.0.0.1:3000/studio/. During development use `npm run cms:dev` at http://localhost:3333/studio/.

- **Pages:** choose Home, About, Curriculum, Admissions or Contact. Change a named photo position, gallery caption, or entry under Page wording. Entries follow page order; styled headings have separate entries for differently styled phrases.
- **Photo library:** upload a photograph, describe it, and adjust its crop and focal point. Each photograph should appear in only one position across the website. Validation prevents publishing a reused image or duplicate library asset.
- **Nursery details:** update shared contact information, parent testimonials and downloadable admission PDFs.

Publish to trigger a website rebuild through the Sanity-to-Cloudflare webhook. Changes appear after the build and deployment complete. Draft edits stay private. Production builds fail if the CMS is unavailable, retaining the last successful deployment. Local development can use fallback content. A separate draft-preview workflow has not been added.

Page layout, navigation structure, form field labels, decorative graphics, SEO metadata, and some shared footer/header wording remain code-managed. The main page wording, photos, gallery captions, testimonials, PDF forms and contact information are editable.

## Photographs

122 archive photos were reviewed. **29 distinct photos** are uploaded and assigned to **29 positions** across the five pages, including the seven curriculum learning areas.

- `content/photo-library.json`: descriptions, archive provenance, dimensions, focal points and actual placements.
- `content/pages.json`: local page defaults and photo assignments.
- `public/images/curated/`: optimized WebP fallback copies. Originals remain untouched.

## Development and deployment

Use **Node.js 24.19.0**, pinned in `.node-version`.

```sh
npm ci
npm run dev
npm run build
```

The standalone Studio builds into `out/studio` alongside the static website. The previous Studio address was https://newdubainursery.vercel.app/studio. Configure the Pages and custom-domain origins in Sanity with credentials enabled before cutover. Pushes to the Cloudflare-connected production branch deploy the site and editor together. See [the migration guide](cloudflare-migration.md) for exact build settings, webhook setup, CORS and domain steps.

No write token is needed in the deployed website: published content comes from the public dataset, and editors authenticate directly with Sanity. Public identifiers are shared in `sanity/project.js`. These content types are for public website content, not private nursery records or application submissions.

## Maintenance

```sh
npm run cms -- login --provider github
npm run cms:seed
npm run cms:seed -- --write
npm run cms:verify
node --test scripts/tests/unique-photo.test.mjs
```

The seed dry run reports the intended import. With `--write`, it uploads missing photos/forms and creates missing documents using stable IDs. Repeating it preserves staff edits.

`scripts/apply-unique-photos.mjs` was used once to apply the reviewed no-repeat assignments. It changes photo references with revision checks and preserves wording and captions. Do not rerun it for ordinary staff editing; the Studio is the normal editor.

Set `SITE_URL` when running verification to check rendered pages and Studio as well as the database. It checks public access, every photo reference, no repeated assets, and all five PDF downloads.

## Nursery Video Tour

In Studio, open **Nursery details → Nursery video tour** to replace the MP4, preview image, heading, or optional English WebVTT captions. Publish to update the About page video and homepage tour link. Removing the video hides both. The video uses native playback controls with no autoplay or initial video download.

The original tour is kept outside Git. The optimized 1280×720 MP4 and its preview are hosted in Sanity. To import a first tour, run `sanity exec scripts/upload-tour.mjs --with-user-token -- path/to/video.mp4 path/to/preview.jpg`; this script refuses to overwrite an existing tour.

## References

- https://www.sanity.io/docs/nextjs
- https://www.sanity.io/docs/content-lake/manage-assets
- https://www.sanity.io/docs/nextjs/embedding-sanity-studio-in-nextjs
