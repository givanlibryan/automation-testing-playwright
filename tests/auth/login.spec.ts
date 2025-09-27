import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { ProductsPage } from '../../src/pages/ProductsPage';
import { users } from '../../src/utils/users';

test.describe('Login', () => {
  test('logs in successfully with STANDARD user', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);

    await login.goto();
    await login.login(users.STANDARD.username, users.STANDARD.password);
    await products.expectVisible();
  });

  test('locked out user sees error banner', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(users.LOCKED.username, users.LOCKED.password);
    await login.expectErrorContains('locked out');
  });
});
