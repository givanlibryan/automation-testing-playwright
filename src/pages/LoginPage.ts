import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username = '[data-test="username"]';
  readonly password = '[data-test="password"]';
  readonly loginBtn = '[data-test="login-button"]';
  readonly error = '[data-test="error"]';
  readonly title = '[data-test="title"]';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.username, username);
    await this.page.fill(this.password, password);
    await this.page.click(this.loginBtn);
  }

  async expectOnProductsPage() {
    await expect(this.page.locator(this.title)).toHaveText('Products');
  }

  async expectErrorContains(text: string) {
    await expect(this.page.locator(this.error)).toContainText(text);
  }
}
