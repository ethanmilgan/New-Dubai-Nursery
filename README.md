# New Dubai Nursery

A modern website for New Dubai Nursery Early Learning Center, built with the same frontend stack as `styleeditbyreena`:

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Plain JavaScript (ES modules)
- Vercel Analytics

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

Use Node.js 22.12 or newer. `npm run cms:verify` checks the saved content and unique photo assignments. The curated fallback copies are in `public/images/curated/`, with descriptions and source references in `content/photo-library.json`.
