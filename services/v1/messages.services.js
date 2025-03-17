const puppeteer = require("puppeteer");

const getAllMessages = async (username, password) => {
  // Run it headless here after
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();

    // Flag for login failure
    let loginFailed = false;

    // An event set to detect if a alert dialog fires up
    // the alert indicates login failure
    page.on("dialog", async (dialog) => {
      loginFailed = true;
      await dialog.dismiss();
    });

    await page.goto("https://pershiess.fasau.ac.ir/", {
      waitUntil: "networkidle2",
    });

    // Filling in credential inputs
    await page.type("#edId", username);
    await page.type("#edPass", password);

    // Submit button clicked
    await page.click("#edEnter");

    // Waits for the page to be navigated in at most 10 seconds
    await Promise.race([
      await page.waitForNavigation({ waitUntil: "networkidle2" }),
      new Promise((resolve) => setTimeout(resolve, 10000)),
    ]);

    if (loginFailed) {
      return null;
    }

    // Opens messages page
    await page.click("#Banner1_edMsg");

    await page.waitForNetworkIdle();
    // Shows up all messages tab
    await page.evaluate("Perform('ALL')");

    await page.waitForNetworkIdle();

    // Gets all messages
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

const getMessageById = async (username, password, msgId) => {
  // Run it headless here after
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();

    // Flag for login failure
    let loginFailed = false;

    // An event set to detect if a alert dialog fires up
    // the alert indicates login failure
    page.on("dialog", async (dialog) => {
      loginFailed = true;
      await dialog.dismiss();
    });

    await page.goto("https://pershiess.fasau.ac.ir/", {
      waitUntil: "networkidle2",
    });

    // Filling in credential inputs
    await page.type("#edId", username);
    await page.type("#edPass", password);

    // Submit button clicked
    await page.click("#edEnter");

    // Waits for the page to be navigated in at most 10 seconds
    await Promise.race([
      await page.waitForNavigation({ waitUntil: "networkidle2" }),
      new Promise((resolve) => setTimeout(resolve, 10000)),
    ]);

    if (loginFailed) {
      return null;
    }

    // Opens messages page
    await page.click("#Banner1_edMsg");

    await page.waitForNetworkIdle();
    // Shows up all messages tab
    await page.evaluate("Perform('ALL')");

    await page.waitForNetworkIdle();

    const msgRow = await page.$(`#edList tr[ident="${msgId}"]`);

    if (!msgRow) {
      return null;
    }

    await msgRow.click();

    await page.waitForNetworkIdle();

    const message = {
      id: msgId,
      title: await page.$eval("#edTitle", (el) => el.textContent.trim()),
      sender: await page.$eval("#edSender", (el) => el.textContent.trim()),
      type: await page.$eval("#edType", (el) => el.textContent.trim()),
      date: await page.$eval("#edDate", (el) => el.textContent.trim()),
      body: await page.$eval("#edText", (el) =>
        el.textContent.trim()
      ),
    };

    return message;

    // Gets all messages
    // const messages = await page.$eval("#edList", (el) => {
    //   const elements = Array.from(el.firstElementChild.children).slice(1);
    //   return elements.map((el) => ({
    //     id: el.getAttribute("ident"),
    //     sender: el.children[2].textContent.trim(),
    //     title: el.children[3].textContent.trim(),
    //     type: el.children[4].textContent.trim(),
    //     date: el.children[5].textContent.trim(),
    //     isRead: el.getAttribute("bgcolor") !== "#ffffff",
    //   }));
    // });

    // return messages;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await browser.close();
  }
};

module.exports = {
  getMessageById,
  getAllMessages,
};
