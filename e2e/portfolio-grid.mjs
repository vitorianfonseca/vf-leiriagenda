// Segunda imagem do portfolio: a grelha de cartazes da página Eventos.  node e2e/portfolio-grid.mjs
import { chromium } from '/Users/vitoriafonseca/dev/unidesk/node_modules/playwright/index.mjs';
const browser = await chromium.launch().catch(() => chromium.launch({ channel: 'chrome' }));
const page = await browser.newPage({ viewport: { width: 1200, height: 750 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:3210/eventos', { waitUntil: 'networkidle', timeout: 90000 });
await page.addStyleTag({ content: 'nextjs-portal, .cursor-dot { display: none !important; } html { scroll-behavior: auto !important; }' });
const top = await page.evaluate(() => document.querySelector('main ul').getBoundingClientRect().top + window.scrollY);
await page.evaluate((y) => window.scrollTo(0, y - 70), top);
await page.waitForTimeout(3000);
await page.screenshot({ path: 'e2e/out/pf/cartazes.png' });
await browser.close();
