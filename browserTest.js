const puppeteer = require("puppeteer");

describe("My first pupeteer test", () => {
  it("Should launch the browser", async function () {
    const browser = await puppeteer.launch({
      headless: true,
      slowMo: 1000,
      devtools: false,
    });
    const page = await browser.newPage();
    await page.goto("https://www.npmjs.com/package/puppeteer");
    await page.waitForTimeout(500);
    await page.waitForSelector("h1");
    await page.goto("https://dev.to/");
    await page.waitForSelector(".hamburger");
    await page.goBack();
    await page.waitForSelector("h1");
    await page.waitForTimeout(10);
    await page.goForward();
    await page.waitForSelector(".hamburger");
    await browser.close();
  });
});
