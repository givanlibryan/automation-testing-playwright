import { Page, expect } from '@playwright/test';

export class FinishPage {
  readonly page: Page;
  readonly title = '[data-test="title"]';
  readonly header = '[data-test="complete-header"]';
  readonly text = '[data-test="complete-text"]';
  readonly backHome = '[data-test="back-to-products"]';

  constructor(page: Page) {
    this.page = page;
  }

  async expectVisible() {
    await expect(this.page.locator(this.title)).toHaveText('Checkout: Complete!');
  }

  async expectThankYou() {
    await expect(this.page.locator(this.header)).toHaveText('Thank you for your order!');
    await expect(this.page.locator(this.text)).toContainText('dispatched');
  }

  async backToProducts() {
    await this.page.click(this.backHome);
  }
}
