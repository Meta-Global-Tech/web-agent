// playwright-extra is a drop-in replacement for playwright,
// it augments the installed playwright with plugin functionality
const { chromium } = require('playwright-extra')

// Load the stealth plugin and use defaults (all tricks to hide playwright usage)
// Note: playwright-extra is compatible with most puppeteer-extra plugins
const stealth = require('puppeteer-extra-plugin-stealth')()

const userLogin = 'max.well.techconsulting@gmail.com';
const userPass = 'Monkey@work101';

// Add the plugin to playwright (any number of plugins can be added)
chromium.use(stealth)

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
// That's it, the rest is playwright usage as normal 😊
chromium.launch({ headless: true }).then(async browser => {
  const page = await browser.newPage()

  console.log('Testing the stealth plugin..')
  await page.goto('https://colab.research.google.com/github/lllyasviel/Fooocus/blob/main/fooocus_colab.ipynb', { waitUntil: 'networkidle' });
  // await page.getByLabel('Run cell', { exact: true }).click();
  await page.getByLabel('Sign in').click();
  // await page.getByLabel('Email or phone').fill('max.well.techconsulting@gmail.com');
  // await page.getByRole('button', { name: 'Next' }).click();
  // await page.waitUntil( 'networkidle')

  // await page.fill('input[type="email"]', userLogin);
  await page.getByLabel('Email or phone').fill(userLogin);
  // await page.locator('#identifierNext >> button').click();
  await page.getByRole('button', { name: 'Next' }).click();
  console.log("username added")
  await page.screenshot({ path: 'stealth1.png', fullPage: true })

  // await page.getByLabel('Next').click();

  await page.screenshot({ path: 'stealth1.1.png', fullPage: true })
  await delay(5000);
  await page.screenshot({ path: 'stealth1.2.png', fullPage: true })

  await page.getByRole('button', { name: 'Try again' }).click();
  await delay(5000);
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
  await browser.close()
})