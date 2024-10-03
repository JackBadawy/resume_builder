import { Builder, By, until, WebDriver } from "selenium-webdriver";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";
import { expect } from "chai";

describe("Resume Builder Utility Panel Logic Tests", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    const chromeOptions = new ChromeOptions();
    chromeOptions.addArguments("--headless=new");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    await driver.get("http://localhost:3000");
    await driver.manage().window().setRect({ width: 1920, height: 1080 });

    await driver.executeScript(`
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '* { transition-duration: 0s !important; animation-duration: 0s !important; }';
        document.getElementsByTagName('head')[0].appendChild(style);
      `);
  });

  afterAll(async () => {
    await driver.quit();
  });

  const waitForAnimation = async (timeout = 1000) => {
    await driver.sleep(timeout);
  };

  const waitForElementAndClick = async (locator: By, timeout = 10000) => {
    const element = await driver.wait(until.elementLocated(locator), timeout);
    await driver.wait(until.elementIsVisible(element), timeout);
    await driver.wait(until.elementIsEnabled(element), timeout);
    await driver.executeScript("arguments[0].scrollIntoView(true);", element);
    await waitForAnimation();
    await driver.executeScript("arguments[0].click();", element);
  };

  const getSectionOrder = async (): Promise<string[]> => {
    const sectionElements = await driver.findElements(
      By.css(".bg-slate-700 span")
    );
    return Promise.all(sectionElements.map((el) => el.getText()));
  };

  test("should move a section up", async () => {
    console.log("Getting initial order of sections");
    const initialOrder = await getSectionOrder();
    console.log("Initial order:", initialOrder);

    const educationIndex = initialOrder.findIndex(
      (section) => section === "Education"
    );
    if (educationIndex <= 0) {
      throw new Error("Education section not found or already at the top");
    }

    console.log("Moving Education section up");
    const educationUpButtonId = `EducationUpBtn`;
    await waitForElementAndClick(By.id(educationUpButtonId));

    await waitForAnimation(2000);

    console.log("Verifying new order of sections");
    const newOrder = await getSectionOrder();
    console.log("New order:", newOrder);

    expect(newOrder).to.not.deep.equal(
      initialOrder,
      "Order should have changed"
    );
    expect(newOrder[educationIndex - 1]).to.equal(
      "Education",
      "Education should have moved up one position"
    );
  });
});
