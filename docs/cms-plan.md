# Nursery content management

The website is connected to the nursery's existing Sanity project: **New Dubai Nursery / Website**, project `jkg6va26`, dataset `production`.

## Staff editor

Open `/studio` on the website and sign in with the GitHub account that has project access. For the local preview, use http://localhost:3107/studio. Normal development runs at http://localhost:3000/studio.

- **Pages:** choose Home, About, Curriculum, Admissions or Contact. Change a named photo position, gallery caption, or entry under Page wording. Entries follow page order; styled headings have separate entries for differently styled phrases.
- **Photo library:** upload a photograph, describe it, and adjust its crop and focal point. Each photograph should appear in only one position across the website. Validation prevents publishing a reused image or duplicate library asset.
- **Nursery details:** update shared contact information, parent testimonials and downloadable admission PDFs.

Publish to make changes available to the website. Draft edits stay private. The site uses a 60-second cache; the first visitor after expiry can see the previous version while a background refresh runs. Local defaults keep the site usable if the CMS is unavailable. A separate draft-preview workflow has not been added.

Page layout, navigation structure, form field labels, decorative graphics, SEO metadata, and some shared footer/header wording remain code-managed. The main page wording, photos, gallery captions, testimonials, PDF forms and contact information are editable.

## Photographs

122 archive photos were reviewed. **29 distinct photos** are uploaded and assigned to **29 positions** across the five pages, including the seven curriculum learning areas.

- `content/photo-library.json`: descriptions, archive provenance, dimensions, focal points and actual placements.
- `content/pages.json`: local page defaults and photo assignments.
- `public/images/curated/`: optimized WebP fallback copies. Originals remain untouched.

## Development and deployment

Use **Node.js 22.12 or newer**. A temporary Node 22 runtime was used for setup without changing the workstation's system Node installation.

```sh
npm ci
npm run dev
npm run build
```

The embedded Studio deploys with the Next.js site. The production Studio address is https://newdubainursery.vercel.app/studio. Its origin, https://newdubainursery.vercel.app, is configured in Sanity with credentials enabled, alongside localhost ports 3000, 3107 and the pre-existing 3333 origin. Push changes to the Vercel-connected GitHub branch to deploy the website and embedded Studio together. Use Node.js 22.x for deployment.

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

## References

- https://www.sanity.io/docs/nextjs
- https://www.sanity.io/docs/content-lake/manage-assets
- https://www.sanity.io/docs/nextjs/embedding-sanity-studio-in-nextjs
