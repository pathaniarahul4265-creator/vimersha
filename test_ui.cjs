const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  const zodiacNodes = await page.$$eval('.hero-z-node', nodes => nodes.length);
  const panchangText = await page.$eval('#panchangDate', el => el.innerText).catch(() => 'NOT FOUND');
  console.log('Zodiac Nodes:', zodiacNodes);
  console.log('Panchang Date:', panchangText);
  await browser.close();
})();
