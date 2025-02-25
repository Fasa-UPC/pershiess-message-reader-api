const puppeteer = require("puppeteer");

const getAllMessages = async (username, password) => {
  // Run it headless here after
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();

    await page.goto("https://pershiess.fasau.ac.ir/", {
      waitUntil: "networkidle2",
    });

    await page.type("#edId", username);
    await page.type("#edPass", password);

    await page.click("#edEnter");

    // page.on("dialog", async (dialog) => {
    //   console.log(dialog.message);
    //   await dialog.accept();
    //   // await browser.close();
    //   // throw new Error();
    // });

    await page.waitForNavigation({ waitUntil: "networkidle2" });

    await page.click("#Banner1_edMsg");

    await page.waitForNetworkIdle();
    await page.evaluate("Perform('ALL')");

    await page.waitForNetworkIdle();

    const messages = await page.$eval("#edList", (el) => {
      const elements = Array.from(el.firstElementChild.children).slice(1);
      return elements.map((el) => ({
        id: el.getAttribute("ident"),
        sender: el.children[2].textContent.trim(),
        title: el.children[3].textContent.trim(),
        type: el.children[4].textContent.trim(),
        date: el.children[5].textContent.trim(),
        isRead: el.getAttribute("bgcolor") !== "#ffffff",
      }));
    });

    return messages;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await browser.close();
  }
};

module.exports = {
  getAllMessages,
};
