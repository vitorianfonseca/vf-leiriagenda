// Imagens de apresentação (2400×1500) para o portfolio.  node e2e/portfolio.mjs
import { chromium } from '/Users/vitoriafonseca/dev/unidesk/node_modules/playwright/index.mjs';
import fs from 'node:fs';
fs.mkdirSync('e2e/out/pf', { recursive: true });
const browser = await chromium.launch().catch(() => chromium.launch({ channel: 'chrome' }));
const page = await browser.newPage({ viewport: { width: 1200, height: 750 }, deviceScaleFactor: 2 });
for (const [name, path] of [['inicio', '/'], ['eventos', '/eventos']]) {
  await page.goto(`http://localhost:3210${path}`, { waitUntil: 'networkidle', timeout: 90000 });
  // Esconde o indicador de desenvolvimento do Next e o ponto do cursor.
  await page.addStyleTag({ content: 'nextjs-portal, .cursor-dot { display: none !important; }' });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `e2e/out/pf/${name}.png` });
}
await browser.close();
