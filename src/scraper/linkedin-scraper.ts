import puppeteer from 'puppeteer';

export const scrapeLinkedIn = async (email: string, password: string) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://www.linkedin.com/feed/', {
    waitUntil: 'domcontentloaded',
  });

  await page.waitForSelector('#username');
  await page.type('#username', email);

  await page.waitForSelector('#password');
  await page.type('#password', password);

  await page.click('.btn__primary--large');

  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  await new Promise((resolve) => setTimeout(resolve, 20000));

  let subheading = await page.evaluate(() =>
    document.querySelector('h3.profile-card-name')
      ? document.querySelector('h3.profile-card-name')!.textContent
      : 'Subheading not found',
  );

  await browser.close();

  return { subheading };
};
