import { Page, expect } from '@playwright/test';

export class OverviewPage {
  readonly page: Page;
  readonly title = '[data-test="title"]';
  readonly itemName = '.inventory_item_name';
  readonly subtotal = '.summary_subtotal_label';
  readonly tax = '.summary_tax_label';
  readonly total = '.summary_total_label';
  readonly finishBtn = '[data-test="finish"]';
  readonly cancelBtn = '[data-test="cancel"]';

  constructor(page: Page) {
    this.page = page;
  }

  async expectVisible() {
    await expect(this.page.locator(this.title)).toHaveText('Checkout: Overview');
  }

  async listItemNames() {
    return (await this.page.locator(this.itemName).allInnerTexts()).map(t => t.trim());
  }

  async expectTotalsVisible() {
    await expect(this.page.locator(this.subtotal)).toContainText('Item total: $');
    await expect(this.page.locator(this.tax)).toContainText('Tax: $');
    await expect(this.page.locator(this.total)).toContainText('Total: $');
  }

  async finish() {
    await this.page.click(this.finishBtn);
  }

  async cancel() {
    await this.page.click(this.cancelBtn);
  }
}
