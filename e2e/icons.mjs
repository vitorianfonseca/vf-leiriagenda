// Gera os ícones do site: um "L" a pincel sobre azul de azulejo.  node e2e/icons.mjs
import { chromium } from '/Users/vitoriafonseca/dev/unidesk/node_modules/playwright/index.mjs';
import fs from 'node:fs';

const font = fs.readFileSync('public/fonts/ed/kolker-brush.woff2').toString('base64');
const html = (round) => `<style>
@font-face { font-family: K; src: url(data:font/woff2;base64,${font}); }
html, body { margin: 0; background: transparent; }
div { width: 512px; height: 512px; background: #1A44E6; border-radius: ${round ? '50%' : '0'}; position: relative; overflow: hidden; }
span { position: absolute; left: 50%; top: 50%; font: 560px/1 K; color: #F8F2EA; transform: translate(-50%, -50%) rotate(-6deg); }
</style><div><span>L</span></div>`;

const browser = await chromium.launch().catch(() => chromium.launch({ channel: 'chrome' }));
for (const [file, size, round] of [['app/icon.png', 128, true], ['app/apple-icon.png', 180, false]]) {
  const page = await browser.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: size / 512 });
  await page.setContent(html(round));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: file, omitBackground: true });
  await page.close();
}
await browser.close();
