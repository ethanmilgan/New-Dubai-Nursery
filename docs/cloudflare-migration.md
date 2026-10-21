# Cloudflare Pages migration

The website and Sanity Studio build to static files in `out/`. Cloudflare Pages serves them without Workers, Functions or a Next.js server. Sanity remains the CMS. The confirmed custom domain is **newdubainursery.com**.

## Build and preview

Use Node.js 24.19.0, pinned in `.node-version`.

```sh
npm ci
npm run build
npm run preview
```

Open http://127.0.0.1:3000 and http://127.0.0.1:3000/studio/. The build exports the five public pages, builds standalone Sanity Studio into `out/studio`, and checks the static files against Pages Free file limits. Studio deep links use the rewrite in `public/_redirects`. Public unknown URLs retain a real 404.

For development, run `npm run dev` for the public website and `npm run cms:dev` for the editor at http://localhost:3333/studio/. The editor no longer runs inside the Next.js development server.

Images use Sanity's resized CDN URLs or the existing local files. There is no Next.js image server. Vercel Analytics has been removed; Cloudflare Web Analytics can be enabled in the Pages dashboard if wanted.

## Create the Pages project

1. In Cloudflare, open **Workers & Pages**, create a **Pages** application and connect this GitHub repository. Choose Git integration so code pushes and CMS deploy hooks can trigger builds.
2. Select the intended production branch. Use framework preset **None**, build command `npm run build`, output directory `out`, repository root as the root directory, and Node.js `24.19.0` (or let `.node-version` supply it).
3. Do not select the server-rendered Next.js preset, install a Workers adapter, or use `.next` as the output directory.
4. Build and test the assigned `https://<project>.pages.dev` address before changing DNS. No Sanity read/write token is needed for the public dataset.
5. In Sanity Manage, project `jkg6va26`, add the exact Pages origin under **API > CORS origins**, with credentials enabled, so editors can sign in. Also add `https://newdubainursery.com` and `https://www.newdubainursery.com` when using those domains. Origins have no `/studio` path. Avoid credentialed wildcard preview origins.

## Rebuild when Sanity content changes

Static pages capture published CMS content at build time. Publishing is no longer visible after a 60-second server cache refresh. It becomes visible after the triggered build and deployment finish, normally a few minutes. The editor itself continues to read and write Sanity directly.

1. In the Pages project's **Settings > Builds**, create a production-branch deploy hook named `Sanity publish`.
2. Copy its URL into a Sanity webhook in **API > Webhooks** for the `production` dataset. Treat the URL as a secret: anyone with it can trigger builds. Do not put it in source code or browser environment variables.
3. Set the method to **POST**, enable **create**, **update** and **delete**, and disable triggering for drafts and content versions. Use this GROQ filter:

   ```groq
   _type in ["nurseryPage", "nurseryPhoto", "nurserySettings"] &&
   !(_id in path("drafts.**")) && !(_id in path("versions.**"))
   ```

4. Save the webhook. Publish one small change, verify the webhook delivery and Pages deployment succeed, then confirm the public page shows it. Restore the content if it was only a test. Check both photo and settings changes as well as page wording.

The Free plan currently permits 500 builds per month across the account. Each matching published document event can trigger a build, so bulk content imports can consume many builds. Disable the webhook during bulk edits and manually deploy once afterward. If a CMS fetch fails during production build, the build fails instead of replacing published content with local defaults; the prior successful deployment stays live.

## Connect the GoDaddy domain

Keep GoDaddy as registrar. Registering elsewhere is unnecessary.

1. Add `newdubainursery.com` as a site/zone in Cloudflare on its Free plan. Review the imported DNS records, including existing email MX, SPF, DKIM and verification records, before switching nameservers.
2. At GoDaddy, change the domain's nameservers to the pair assigned to that Cloudflare zone. The apex domain on Pages requires Cloudflare-managed DNS. Coordinate any DNSSEC change using the provider's migration instructions.
3. In **Pages > Custom domains**, add `newdubainursery.com` and `www.newdubainursery.com`. Let the dashboard create/verify the required records and wait for active HTTPS certificates. Adding a DNS record alone does not attach a domain to a Pages project.
4. Use Cloudflare's redirect rules to redirect `www.newdubainursery.com` to `https://newdubainursery.com`, preserving path and query string. The site's metadata uses the apex domain.
5. Verify the website, Studio sign-in, Studio deep-link reloads, images, admission PDFs and WhatsApp enquiries on the custom domain. Confirm a Sanity publish triggers and completes a rebuild.
6. Only after this succeeds, disable the old Vercel Git deployments and remove/cancel the old hosting allocation if it is no longer needed. A Pro subscription can cover other projects, so check them before cancelling the team subscription.

## Rollback

Before DNS changes, record the existing DNS configuration and keep the Vercel deployment available. If cutover fails, restore the recorded web DNS configuration while investigating. For a bad Pages release, roll back to a previously successful production deployment in Pages and pause the webhook if necessary. CMS data is unchanged by this migration.

## Remaining account setup

Local code preparation does not create a Cloudflare project, configure CORS/webhooks, change nameservers, or cancel Vercel. Those steps need account access and successful end-to-end verification.

## References

- [Cloudflare Next.js static exports](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)
- [Pages deploy hooks](https://developers.cloudflare.com/pages/configuration/deploy-hooks/)
- [Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Pages redirects and rewrites](https://developers.cloudflare.com/pages/configuration/redirects/)
- [Pages Free limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Sanity static builds](https://www.sanity.io/docs/cli-reference/build)
