# Nursery content management

The website is connected to the nursery's existing Sanity project: **New Dubai Nursery / Website**, project `jkg6va26`, dataset `production`.

## Staff editor

Open `/studio/` on the deployed website and sign in with the GitHub account that has project access. After `npm run build`, `npm run preview` serves the editor at http://127.0.0.1:3000/studio/. During development use `npm run cms:dev` at http://localhost:3333/studio/.

- **Pages:** choose Home, About, Curriculum, Admissions or Contact. Change a named photo position, gallery caption, or entry under Page wording. Entries follow page order; styled headings have separate entries for differently styled phrases.
- **Photo library:** upload a photograph, describe it, and adjust its crop and focal point. Each photograph should appear in only one position across the website. Validation prevents publishing a reused image or duplicate library asset.
- **Nursery details:** update shared contact information, parent testimonials and downloadable admission PDFs.

Publish to trigger a website rebuild through the Sanity-to-Cloudflare webhook. Changes appear after the build and deployment complete. Draft edits stay private. Production builds fail if the CMS is unavailable, retaining the last successful deployment. Local development can use fallback content. A separate draft-preview workflow has not been added.

Under **Nursery details → Parent testimonials**, edit the parent name, short quotation, and optional full testimonial. The home slider displays the short quotation and offers **Read Full Testimonial** when a full letter is provided. Rotation pauses while the full letter is open. The current entries were refreshed from the [appreciation letters Google Doc](https://docs.google.com/document/d/1y_HrEslUrL4xhLrdaNM6x9vG9wgd6d8BaAOctmpn1yA); future edits to that Google Doc are not imported automatically. `content/testimonials.json` contains local fallbacks. `sanity exec scripts/update-testimonials.mjs --with-user-token -- --write` publishes those entries with a local backup and revision checks.

Page layout, navigation structure, form field labels, decorative graphics, SEO metadata, and some shared footer/header wording remain code-managed. The main page wording, photos, gallery captions, testimonials, PDF forms and contact information are editable.

The home page's three “Discover this stage” links open age-specific newsletters in a new tab. In Studio, open **Nursery details → Age-group newsletters**, expand the matching age group (Ages 2–3, Ages 3–4 or Ages 4–6), replace its PDF, and publish. Publication triggers a rebuild; the deployed site updates when that build finishes. The current PDFs in `public/newsletters/` provide local fallbacks. `content/newsletters.js` fixes the age-group mapping so changing a PDF cannot reorder the home-page cards.

To import missing newsletter PDFs without replacing editor selections, run `sanity exec scripts/seed-newsletters.mjs --with-user-token -- --write`. Omit `--write` for a dry run.

## Photographs

The original review covered 122 archive photos. The October meeting update adds selections from the supplied new photo folder. **35 distinct photos** are assigned to **35 positions** across the five pages, including the seven curriculum learning areas and four enrichment cards. The photo library also retains unused images. See [the meeting review](october-meeting-review.md) for the changes and outstanding source files.

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
