import { Builder, By, until, WebDriver, WebElement } from "selenium-webdriver";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";
import { expect } from "chai";

describe("Resume Builder Tests", () => {
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

  const waitForElementAndSendKeys = async (
    locator: By,
    keys: string,
    timeout = 10000
  ) => {
    const element = await driver.wait(until.elementLocated(locator), timeout);
    await driver.wait(until.elementIsVisible(element), timeout);
    await waitForAnimation();
    await element.sendKeys(keys);
  };

  const closeModalIfPresent = async () => {
    try {
      const modal = await driver.wait(
        until.elementLocated(By.css(".fixed.inset-0")),
        5000
      );
      if (await modal.isDisplayed()) {
        await waitForAnimation();
        const closeButton = await modal.findElement(
          By.xpath(".//button[text()='✕']")
        );
        await driver.executeScript("arguments[0].click();", closeButton);
        await waitForAnimation();
        await driver.wait(until.stalenessOf(modal), 5000);
      }
    } catch (error) {}
  };

  const logPageSource = async (driver: WebDriver) => {
    const pageSource = await driver.getPageSource();
    console.log("Current page source:", pageSource);
  };

  test("should toggle LinkedIn and Address visibility", async () => {
    const linkedinToggle = await driver.wait(
      until.elementLocated(
        By.xpath("//span[text()='LinkedIn']/following-sibling::div")
      ),
      10000
    );
    const addressToggle = await driver.wait(
      until.elementLocated(
        By.xpath("//span[text()='Address']/following-sibling::div")
      ),
      10000
    );

    await linkedinToggle.click();
    let linkedinInputs: WebElement[] = await driver.findElements(
      By.xpath("//span[text()='LinkedIn Profile:']")
    );
    expect(linkedinInputs.length).to.equal(0);

    await addressToggle.click();
    let addressInputs: WebElement[] = await driver.findElements(
      By.xpath("//span[text()='Address:']")
    );
    expect(addressInputs.length).to.equal(0);

    await linkedinToggle.click();
    await addressToggle.click();
    linkedinInputs = await driver.wait<WebElement[]>(
      until.elementsLocated(By.xpath("//span[text()='LinkedIn Profile:']")),
      10000
    );
    addressInputs = await driver.wait<WebElement[]>(
      until.elementsLocated(By.xpath("//span[text()='Address:']")),
      10000
    );
    expect(linkedinInputs.length).to.be.greaterThan(0);
    expect(addressInputs.length).to.be.greaterThan(0);
  });

  test("should fill out basic resume information", async () => {
    try {
      console.log("Entering full name");
      await waitForElementAndSendKeys(
        By.css("input[placeholder='Click to Enter Name...']"),
        "John Doe"
      );

      console.log("Entering job title");
      await waitForElementAndSendKeys(
        By.css("input[placeholder='Click to Enter Job Title...']"),
        "Software Developer"
      );

      console.log("Entering phone number");
      await waitForElementAndSendKeys(
        By.css("input[placeholder='Click to Enter Phone']"),
        "123-456-7890"
      );

      console.log("Entering email");
      await waitForElementAndSendKeys(
        By.css("input[placeholder='Click to Enter Email']"),
        "john.doe@example.com"
      );

      console.log("Verifying entered information");
      const fullName = await driver
        .findElement(By.css("input[placeholder='Click to Enter Name...']"))
        .getAttribute("value");
      const jobTitle = await driver
        .findElement(By.css("input[placeholder='Click to Enter Job Title...']"))
        .getAttribute("value");
      const phone = await driver
        .findElement(By.css("input[placeholder='Click to Enter Phone']"))
        .getAttribute("value");
      const email = await driver
        .findElement(By.css("input[placeholder='Click to Enter Email']"))
        .getAttribute("value");

      expect(fullName).to.equal("John Doe");
      expect(jobTitle).to.equal("Software Developer");
      expect(phone).to.equal("123-456-7890");
      expect(email).to.equal("john.doe@example.com");

      console.log("Basic resume information filled out successfully");
    } catch (error) {
      console.error("Error in filling out basic resume information:", error);
      await logPageSource(driver);
      throw error;
    }
  });

  test("should attempt to generate a DOCX file", async () => {
    try {
      console.log("Locating Generate Word Doc button");
      const generateButton = await driver.wait(
        until.elementLocated(By.xpath("//button[text()='Generate Word Doc']")),
        20000
      );
      console.log("Clicking Generate Word Doc button");
      await driver.executeScript("arguments[0].click();", generateButton);
      await waitForAnimation(1000);

      console.log("Waiting for modal to appear");
      const modal = await driver.wait(
        until.elementLocated(By.css(".fixed.inset-0")),
        20000
      );

      console.log("Checking modal content");
      const modalText = await modal.getText();
      expect(modalText).to.include(
        "Please fill out or delete all unpopulated sections"
      );

      console.log("Locating Close button");
      const closeButton = await driver.wait(
        until.elementLocated(By.xpath("//button[text()='Cancel']")),
        20000
      );
      console.log("Clicking Close button");
      await driver.executeScript("arguments[0].click();", closeButton);

      console.log("Waiting for modal to close");
      await waitForAnimation(3000);
      await driver.wait(
        async () => {
          const modalPresent = await driver.findElements(
            By.css(".fixed.inset-0")
          );
          return modalPresent.length === 0;
        },
        20000,
        "Modal did not close after clicking Close button"
      );

      console.log("DOCX file generation attempt completed successfully");
    } catch (error) {
      console.error("Error in generate DOCX test:", error);
      await logPageSource(driver);
      throw error;
    }
  });

  test("should reset all sections", async () => {
    await closeModalIfPresent();

    console.log("Clicking Reset Sections button");
    await waitForElementAndClick(By.xpath("//button[text()='Reset Sections']"));

    console.log("Confirming reset");
    await waitForElementAndClick(By.xpath("//button[text()='Confirm']"));

    console.log("Waiting for reset to complete");
    await waitForAnimation(2000);

    console.log("Verifying default sections");
    const defaultSections = [
      "About Me",
      "Work Experience",
      "Education",
      "References",
    ];
    for (const section of defaultSections) {
      const sectionElement = await driver.findElement(
        By.xpath(`//span[text()='${section}']`)
      );
      expect(await sectionElement.isDisplayed()).to.be.true;
    }

    console.log("Verifying custom sections are removed");
    const customSections = await driver.findElements(
      By.xpath("//span[text()='Skills']")
    );
    expect(customSections.length).to.equal(0);
  });
});
