const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR STACK:', err.stack));
  
  await page.goto('file://' + path.resolve('vercel.html'), { waitUntil: 'networkidle' });
  await browser.close();
})();
