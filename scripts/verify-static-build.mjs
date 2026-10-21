import {readdir, readFile, stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';

const root = path.resolve('out');
for (const route of ['', 'about', 'curriculum', 'admissions', 'contact', 'studio']) {
  const html = await readFile(path.join(root, route, 'index.html'), 'utf8');
  assert(html.includes('<html'), `Missing HTML for /${route}`);
  assert(!html.includes('/_next/image?'), `Server image endpoint in /${route}`);
  assert(!html.includes('/_vercel/'), `Vercel dependency in /${route}`);
}
await stat(path.join(root, '404.html'));
const redirects = await readFile(path.join(root, '_redirects'), 'utf8');
assert(redirects.includes('/studio/structure/* /studio/index.html 200'), 'Missing Studio deep-link rewrite');
assert(!redirects.includes('/studio/* '), 'A broad Studio rewrite would intercept static assets');
let files = 0;
async function check(dir) {
  for (const entry of await readdir(dir, {withFileTypes: true})) {
    const name = path.join(dir, entry.name);
    if (entry.isDirectory()) await check(name);
    else {
      files++;
      assert((await stat(name)).size <= 25 * 1024 * 1024, `Exceeds Pages 25 MiB file limit: ${name}`);
    }
  }
}
await check(root);
assert(files <= 20000, `Exceeds Pages Free 20,000 file limit: ${files}`);
console.log(`Static export verified: public pages, Studio, 404, rewrites and ${files} files.`);
