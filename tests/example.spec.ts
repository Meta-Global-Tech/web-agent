import { test, expect } from '@playwright/test';
const { chromium } = require("playwright");

const userLogin = 'max.well.techconsulting@gmail.com';
const userPass = 'Monkey@work101';

test('has title', async () => {
  const browser = await chromium.launch({
      headless: false,
      args:  [
        "--use-fake-device-for-media-stream",
        "--use-fake-ui-for-media-stream",
        "--no-sandbox-and-elevated",
        "--disable-translate",
        "--allow-file-access-from-files",
        "--mute-audio",
        "--disable-dev-shm-usage",
        "--autoplay-policy=no-user-gesture-required",
        "--disable-gpu",
        "--disable-sync",
        "--no-first-run",
        "--ignore-certificate-errors",
        "--disable-web-security",
      ],
  });
  const context = await browser.newContext({});
  const page = await context.newPage();
  const navigationPromise = page.waitForNavigation({
      waitUntil: "domcontentloaded",
  });
  await page.setDefaultNavigationTimeout(0);
  await page.goto('https://colab.research.google.com/github/lllyasviel/Fooocus/blob/main/fooocus_colab.ipynb', { waitUntil: 'networkidle' });
  
  await page.getByLabel('Sign in').click();
  await page.getByLabel('Email or phone').fill(userLogin);
  await page.getByRole('button', { name: 'Next' }).click();
  console.log("username added")
  await page.getByLabel('Try again').click();
  await page.getByLabel('Email or phone').fill(userLogin);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.screenshot({ path: 'stealth1.3.png', fullPage: true })

  // await page.fill('input[type="password"]', userPass);
  await page.getByLabel('Enter your password').fill(userPass);
  

  await page.screenshot({ path: 'stealth2.png', fullPage: true })
  // await page.locator('#passwordNext >> button').click();
  await page.getByRole('button', { name: 'Next' }).click();
  console.log("password added")

  
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


