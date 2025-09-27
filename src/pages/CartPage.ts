import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title = '[data-test="title"]';
  readonly itemName = '.inventory_item_name';
  readonly removeBtn = 'button:has-text("Remove")';
  readonly checkoutBtn = '[data-test="checkout"]';
  readonly continueShoppingBtn = '[data-test="continue-shopping"]';

  constructor(page: Page) {
    this.page = page;
  }

  async expectVisible() {
    await expect(this.page.locator(this.title)).toHaveText('Your Cart');
  }

  async itemNames(): Promise<string[]> {
    const els = await this.page.locator(this.itemName).allInnerTexts();
    return els.map(t => t.trim());
  }

  async removeByName(name: string) {
    const row = this.page.locator('.cart_item').filter({ hasText: name });
    await row.getByRole('button', { name: 'Remove' }).click();
  }

  async checkout() {
    await this.page.click(this.checkoutBtn);
  }

  async continueShopping() {
    await this.page.click(this.continueShoppingBtn);
  }
}
