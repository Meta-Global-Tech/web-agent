import { test, expect } from '@playwright/test';
const { chromium } = require("playwright");

const userLogin = 'max.well.techconsulting@gmail.com';
const userPass = 'Monkey@work101';

test('has title', async () => {
  const browser = await chromium.launch({
    ignoreDefaultArgs: ['--disable-component-extensions-with-background-pages']
  });
  const context = await browser.newContext({});
  const page = await context.newPage();
  const navigationPromise = page.waitForNavigation({
      waitUntil: "domcontentloaded",
  });
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
      "https://accounts.google.com/signin/v2/identifier?hl=en&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
  );
  await navigationPromise;
  await page.waitForSelector('input[type="email"]');
  await page.type('input[type="email"]', "youremail");
  await page.click("#identifierNext");
  await page.waitForSelector('input[type="password"]', { visible: true });
  await page.type('input[type="password"]', "yourpassword");
  await page.waitForSelector("#passwordNext", { visible: true });
  await page.click("#passwordNext");
  await navigationPromise;
  await page.goto('https://colab.research.google.com/github/lllyasviel/Fooocus/blob/main/fooocus_colab.ipynb', { waitUntil: 'networkidle' });
  
  
  // await page.locator('button >> nth=1').click();
  await page.screenshot({ path: 'stealth.png', fullPage: true })
  // await page.getByRole('button', { name: 'Not now' }).click();
  // await page.screenshot({ path: 'stealth3.png', fullPage: true })

  // await page.getByRole('button', { name: 'Not now' }).click();
  // await page.screenshot({ path: 'stealth4.png', fullPage: true })



  // await page.getByLabel('Not now').click();
  await page.waitForURL('https://colab.research.google.com/github/lllyasviel/Fooocus/blob/main/fooocus_colab.ipynb');

  await page.context().storageState({ path: './setup/storage-state.json' });
  console.log('All done, check the screenshot. ✨')
});


