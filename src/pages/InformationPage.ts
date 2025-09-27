import { Page, expect } from '@playwright/test';

export class InformationPage {
  readonly page: Page;
  readonly title = '[data-test="title"]';
  readonly first = '[data-test="firstName"]';
  readonly last = '[data-test="lastName"]';
  readonly zip = '[data-test="postalCode"]';
  readonly continueBtn = '[data-test="continue"]';
  readonly cancelBtn = '[data-test="cancel"]';
  readonly error = '[data-test="error"]';

  constructor(page: Page) {
    this.page = page;
  }

  async expectVisible() {
    await expect(this.page.locator(this.title)).toHaveText('Checkout: Your Information');
  }

  async fillAndContinue(first: string, last: string, zip: string) {
    await this.page.fill(this.first, first);
    await this.page.fill(this.last, last);
    await this.page.fill(this.zip, zip);
    await this.page.click(this.continueBtn);
  }

  async expectErrorContains(text: string) {
    await expect(this.page.locator(this.error)).toContainText(text);
  }

  async cancel() {
    await this.page.click(this.cancelBtn);
  }
}
