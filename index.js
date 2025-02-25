const puppeteer = require("puppeteer");

(async function () {
  // Run it headless here after
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto("https://pershiess.fasau.ac.ir/", {
      waitUntil: "networkidle2",
    });

    await page.type("#edId", "s4311125");
    await page.type("#edPass", "Om!dsys379");

    await page.click("#edEnter");

    await page.waitForNavigation({ waitUntil: "networkidle2" });

    await page.click("#Banner1_edMsg");

    await page.waitForNetworkIdle();
    await page.evaluate("Perform('ALL')");

    await page.waitForNetworkIdle();

    const messages = await page.$eval("#edList", (el) => {
      const elements = Array.from(el.firstElementChild.children).slice(1);
      return elements.map((el) => ({
        sender: el.children[2].textContent.trim(),
        title: el.children[3].textContent.trim(),
        type: el.children[4].textContent.trim(),
        date: el.children[5].textContent.trim(),
        isRead: el.getAttribute("bgcolor") !== "#ffffff",
      }));
    });

    console.log(messages);
  } catch (error) {
    // Log errors
  } finally {
    await browser.close();
  }
})();
