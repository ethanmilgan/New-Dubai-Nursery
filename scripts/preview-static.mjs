import {createServer} from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('out');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.txt':'text/plain','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.pdf':'application/pdf','.ico':'image/x-icon','.woff2':'font/woff2'};
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const assetPath = pathname.startsWith('/static/') ? `/studio${pathname}` : pathname;
    let file = path.resolve(root, `.${assetPath}`);
    if (file !== root && !file.startsWith(root + path.sep)) {res.writeHead(403).end(); return;}
    try {if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');}
    catch {if (/^\/studio\/(structure|intent|releases)(\/|$)/.test(pathname)) file = path.join(root, 'studio/index.html');}
    const data = await readFile(file);
    res.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream'}).end(data);
  } catch {
    res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});
    res.end(await readFile(path.join(root, '404.html')).catch(() => 'Run npm run build first.'));
  }
});
server.listen(Number(process.env.PORT || 3000), '127.0.0.1', () => console.log(`Static preview: http://127.0.0.1:${server.address().port}`));
