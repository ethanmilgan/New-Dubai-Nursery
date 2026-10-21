# New Dubai Nursery

A modern website for New Dubai Nursery Early Learning Center, built with the same frontend stack as `styleeditbyreena`:

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Plain JavaScript (ES modules)
- Cloudflare Pages static hosting

## Local development

```bash
npm install
npm run dev
```

Then visit `http://localhost:3000`.

## Production check

```bash
npm run build
```

## Content notes

Local fallback photography and admission forms are stored in `public/`. `app/lib/site-data.js` provides fallback contact details, the Al Hudaiba address and Google Maps links when CMS content is unavailable.

Sanity now manages the main page wording, photos, contact details, testimonials, and admission forms. Open `/studio` and sign in with GitHub to edit. The 29 curated photographs each occupy a unique position across the website; the editor checks for image reuse before publishing. See [the CMS guide](docs/cms-plan.md) for editing, verification and deployment instructions.

Use Node.js 24.19.0 (see `.node-version`). `npm run cms:verify` checks the saved content and unique photo assignments. The curated fallback copies are in `public/images/curated/`, with descriptions and source references in `content/photo-library.json`.

## Static hosting

`npm run build` exports the website and standalone Sanity Studio into `out/`. `npm run preview` serves that output locally, including Studio deep links. During development, `npm run cms:dev` starts the editor separately at http://localhost:3333/studio/.

Published content appears on the website after a successful rebuild. See [the Cloudflare migration guide](docs/cloudflare-migration.md) for Pages build settings, automatic Sanity rebuilds, domain setup for **newdubainursery.com**, verification and rollback.
