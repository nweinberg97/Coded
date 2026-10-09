// Build / dev server for Coded, powered by esbuild (no other build tooling).
//   node scripts/build.mjs            → production build into dist/
//   node scripts/build.mjs --serve    → dev server with rebuild-on-save (http://localhost:5173)
//   node scripts/build.mjs --preview  → serve the existing dist/ (http://localhost:4173)
import * as esbuild from 'esbuild';
import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const dist = join(root, 'dist');
const args = new Set(process.argv.slice(2));
const serve = args.has('--serve');
const preview = args.has('--preview');

function copyStatic() {
  mkdirSync(dist, { recursive: true });
  cpSync(join(root, 'public'), dist, { recursive: true });
  writeFileSync(join(dist, 'index.html'), readFileSync(join(root, 'index.html'), 'utf8'));
  // GitHub Pages: don't run Jekyll over the output
  writeFileSync(join(dist, '.nojekyll'), '');
}

const options = {
  entryPoints: { app: join(root, 'src/main.tsx') },
  bundle: true,
  outdir: join(dist, 'assets'),
  format: 'esm',
  target: ['es2020', 'chrome100', 'firefox100', 'safari15'],
  jsx: 'automatic',
  minify: !serve,
  sourcemap: serve ? 'inline' : 'linked',
  define: { 'process.env.NODE_ENV': JSON.stringify(serve ? 'development' : 'production') },
  loader: { '.woff': 'file', '.woff2': 'file', '.svg': 'file' },
  external: ['/fonts/*', '../fonts/*'],
  logLevel: 'info',
  legalComments: 'linked',
};

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.woff': 'font/woff', '.woff2': 'font/woff2', '.json': 'application/json', '.map': 'application/json',
  '.txt': 'text/plain; charset=utf-8', '.png': 'image/png', '.webmanifest': 'application/manifest+json',
};

function staticServer(dir, port) {
  createServer((req, res) => {
    const url = decodeURIComponent((req.url ?? '/').split('?')[0]);
    let file = normalize(join(dir, url));
    if (!file.startsWith(dir)) {
      res.writeHead(403).end();
      return;
    }
    if (!existsSync(file) || statSync(file).isDirectory()) file = join(dir, 'index.html');
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(readFileSync(file));
  }).listen(port, () => console.log(`\n  Coded running at http://localhost:${port}\n`));
}

if (preview) {
  if (!existsSync(join(dist, 'index.html'))) {
    console.error('No dist/ build found. Run `npm run build` first.');
    process.exit(1);
  }
  staticServer(dist, Number(process.env.PORT ?? 4173));
} else if (serve) {
  rmSync(dist, { recursive: true, force: true });
  copyStatic();
  const ctx = await esbuild.context(options);
  await ctx.watch();
  staticServer(dist, Number(process.env.PORT ?? 5173));
} else {
  rmSync(dist, { recursive: true, force: true });
  copyStatic();
  const result = await esbuild.build({ ...options, metafile: true });
  const out = Object.entries(result.metafile.outputs)
    .filter(([f]) => !f.endsWith('.map'))
    .map(([f, o]) => `  ${f.replace(root + '/', '')}  ${(o.bytes / 1024).toFixed(1)} kB`);
  // Stamp the service worker with a content hash so each deploy refreshes the offline cache.
  const { createHash } = await import('node:crypto');
  const hash = createHash('sha256');
  for (const f of ['assets/app.js', 'assets/app.css', 'index.html']) hash.update(readFileSync(join(dist, f)));
  const swPath = join(dist, 'sw.js');
  writeFileSync(swPath, readFileSync(swPath, 'utf8').replaceAll('__BUILD_ID__', hash.digest('hex').slice(0, 12)));
  console.log('\nBuilt:\n' + out.join('\n'));
}
