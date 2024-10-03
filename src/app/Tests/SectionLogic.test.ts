import { Builder, By, until, WebDriver } from "selenium-webdriver";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";
import { expect } from "chai";

describe("Resume Builder Section Logic Tests", () => {
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

  test("should add a work experience entry", async () => {
    await closeModalIfPresent();

    await waitForElementAndClick(By.id("HelpWorkExperience"));

    await waitForElementAndSendKeys(
      By.id("JobTitleInput"),
      "Software Engineer"
    );
    await waitForElementAndSendKeys(
      By.id("EmployerInput"),
      "Tech Solutions Inc."
    );
    await waitForElementAndSendKeys(
      By.id("EmploymentPeriodInput"),
      "2021-2023"
    );
    await waitForElementAndSendKeys(
      By.id("DutyInput0"),
      "Developed scalable web applications"
    );

    await waitForElementAndClick(By.id("ConfirmButton"));

    await waitForAnimation(2000);
    const newEntry = await driver.wait(
      until.elementLocated(By.id("WorkExperience0")),
      1000
    );
    expect(await newEntry.isDisplayed()).to.be.true;
  });

  test("should add an education entry", async () => {
    await closeModalIfPresent();

    await waitForElementAndClick(By.id("HelpEducation"));

    await waitForElementAndSendKeys(
      By.id("CertificationInput"),
      "Bachelor of Science in Computer Science"
    );
    await waitForElementAndSendKeys(
      By.id("SchoolInput"),
      "University of Technology"
    );
    await waitForElementAndSendKeys(By.id("TimePeriodInput"), "2017-2021");

    await waitForElementAndClick(By.id("ConfirmButton"));

    await waitForAnimation(2000);
    const newEntry = await driver.wait(
      until.elementLocated(By.id("Education0")),
      10000
    );
    expect(await newEntry.isDisplayed()).to.be.true;
  });

  test("should add a reference entry", async () => {
    await closeModalIfPresent();

    await waitForElementAndClick(By.id("HelpReferences"));

    await waitForElementAndSendKeys(By.id("NameInput"), "John Doe");
    await waitForElementAndSendKeys(By.id("PhoneInput"), "+1 (555) 123-4567");
    await waitForElementAndSendKeys(By.id("PositionInput"), "Senior Manager");

    await waitForElementAndClick(By.id("ConfirmButton"));

    await waitForAnimation(2000);
    const newEntry = await driver.wait(
      until.elementLocated(By.id("References0")),
      10000
    );
    expect(await newEntry.isDisplayed()).to.be.true;
  });

  test("should update About Me section", async () => {
    await closeModalIfPresent();

    console.log("Clicking About Me add entry button");
    await waitForElementAndClick(By.id("HelpAboutMe"));

    console.log("Selecting a template");
    await waitForElementAndClick(By.id("AddTemplateButton"));

    console.log("Verifying About Me content update");
    await waitForAnimation(2000);
    const aboutMeContent = await driver.wait(
      until.elementLocated(By.id("AboutMe-0")),
      10000
    );
    const content = await aboutMeContent.getAttribute("value");
    expect(content.length).to.be.greaterThan(0);
  });
});
