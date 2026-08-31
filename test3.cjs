const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('pageerror', err => console.log('PAGE ERROR STACK:', err.stack));
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await browser.close();
})();
