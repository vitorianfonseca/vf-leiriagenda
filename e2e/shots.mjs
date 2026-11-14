// Capturas dos ecrãs principais.  node e2e/shots.mjs [pasta] [largura]
import { chromium } from '/Users/vitoriafonseca/dev/unidesk/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const out = `e2e/out/${process.argv[2] ?? 'base'}`;
const width = Number(process.argv[3] ?? 1440);
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch().catch(() => chromium.launch({ channel: 'chrome' }));
const page = await browser.newPage({ viewport: { width, height: width < 768 ? 844 : 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
const first = process.env.EVENT ?? '';
for (const [name, path] of [['inicio', '/'], ['eventos', '/eventos'], ['evento', first], ['sobre', '/sobre'], ['login', '/login'], ['submeter', '/submeter'], ['favoritos', '/favoritos'], ['contacto', '/contacto']]) {
  if (!path) continue;
  errors.length = 0;
  await page.goto(`http://localhost:3210${path}`, { waitUntil: 'networkidle', timeout: 90000 }).catch((e) => errors.push(String(e)));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${out}/${name}-topo.png` });
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(errors.length || overflow > 1 ? '✗' : '✓', name, overflow > 1 ? `transborda ${overflow}px` : '', errors.slice(0, 3).join(' | ').slice(0, 300));
}
await browser.close();
