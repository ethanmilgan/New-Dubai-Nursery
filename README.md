# Early Years Education Group

The website for Early Years Education Group (EYEG), an early-childhood education provider for children aged 2 to 6 in Dubai. The site presents the group, curriculum, admissions information, important dates, and New Dubai Nursery Early Learning Center.

## Technology

- [Next.js 16](https://nextjs.org/) with the App Router
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/) for images and downloadable documents
- [Vercel Analytics](https://vercel.com/analytics)

## Prerequisites

- Node.js 20.9 or newer
- npm
- A MongoDB deployment for database-backed media in production

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create the local environment file:

   ```powershell
   Copy-Item .env.example .env.local
   ```

   On macOS or Linux, use `cp .env.example .env.local` instead.

3. Update `.env.local` with your MongoDB connection details.

4. Seed the media collection:

   ```bash
   npm run db:seed:media
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

For a quick local preview without MongoDB, keep `MEDIA_LOCAL_FALLBACK=true`. The application will serve media directly from `media-source/` while running in development.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_URI` | Production | MongoDB connection string. It is also required by the media seed command. |
| `MONGODB_DB` | No | Database name. Defaults to `early_years_education_group`. |
| `MEDIA_LOCAL_FALLBACK` | Development only | Set to `true` to serve files from `media-source/` when a database record is unavailable. Do not enable this in production. |

Never commit `.env.local` or production credentials.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Serve the production build. |
| `npm run db:seed:media` | Synchronize files in `media-source/` with MongoDB. |

The media seed is idempotent: it inserts new files, updates changed files, leaves unchanged files alone, and removes seed-managed records whose source files were deleted.

## Site routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about-us` | About EYEG |
| `/curriculum` | Curriculum and areas of learning |
| `/admissions` | Admissions details and forms |
| `/academic-calendar` | Academic calendar and updates |
| `/ndnelc` | New Dubai Nursery Early Learning Center |
| `/contact-us` | Contact details and inquiry form |

The inquiry form opens the visitor's email application with a prefilled message; it does not submit data to a server endpoint.

## Media storage

Images and PDFs are stored in the MongoDB `mediaAssets` collection and served by the dynamic `/api/media/[...key]` route. Rewrites keep shorter public paths available:

- `/assets/<filename>` maps to `/api/media/assets/<filename>`
- `/forms/<filename>` maps to `/api/media/forms/<filename>`

Source files live under `media-source/assets/` and `media-source/forms/`. To add or replace media:

1. Add or update the file under the appropriate `media-source/` directory.
2. Run `npm run db:seed:media` against the target database.
3. Reference the stable media path from the application.

See [docs/media-storage.md](docs/media-storage.md) for the collection schema, caching behavior, and storage guidance.

## Project structure

```text
app/
  api/media/          Dynamic media delivery endpoint
  components/         Shared UI components
  lib/                MongoDB and media helpers
  */page.js           App Router pages
docs/                 Technical documentation
media-source/         Source images and downloadable forms
scripts/              Maintenance and database scripts
```

## Production and deployment

Before deployment, verify the production build locally:

```bash
npm run build
npm run start
```

For production:

1. Configure `MONGODB_URI` and, if needed, `MONGODB_DB` in the hosting provider.
2. Leave `MEDIA_LOCAL_FALLBACK` unset.
3. Run `npm run db:seed:media` with the production environment variables to populate the media collection.
4. Deploy the Next.js application to a host that supports the Node.js runtime and dynamic routes, such as Vercel.

The media API explicitly uses the Node.js runtime, so a static-only hosting target is not sufficient.
