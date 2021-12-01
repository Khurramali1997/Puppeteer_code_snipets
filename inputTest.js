const puppeteer = require("puppeteer");

describe("Interaction with input via puppeteer", () => {
  it("Interract with the input elements", async function () {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      devtools: false,
    });
    const page = await browser.newPage();
    await page.goto("https://devexpress.github.io/testcafe/example/");
    await page.type("#developer-name", "Jon Snow");
    await page.click("#tried-test-cafe", { clickCount: 1 });
    await page.select("#preferred-interface", "JavaScript API");
    const message =
      "I am trying to learn how to use puppeteer for automation testing and web scrapping";
    await page.type("#comments", message);
    await page.click("#linux", { clickCount: 1 });

    await page.click("#submit-button", { clickCount: 1 });
    await page.waitForSelector(".result-content");
    await page.waitForTimeout(5000);
    await browser.close();
  });
});
