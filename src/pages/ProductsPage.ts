import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly title = '[data-test="title"]';
  readonly cartLink = '.shopping_cart_link';
  readonly cartBadge = '.shopping_cart_badge';
  readonly itemName = '.inventory_item_name';

  constructor(page: Page) {
    this.page = page;
  }

  async expectVisible() {
    await expect(this.page.locator(this.title)).toHaveText('Products');
  }

  async addProductByName(name: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: name });
    await expect(item.locator(this.itemName)).toHaveText(name);
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.page.click(this.cartLink);
  }

  async cartCount() {
    const badge: Locator = this.page.locator(this.cartBadge);
    if (await badge.count() === 0) return 0;
    return parseInt(await badge.first().innerText(), 10);
  }
}
