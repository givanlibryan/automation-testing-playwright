import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { ProductsPage } from '../../src/pages/ProductsPage';
import { CartPage } from '../../src/pages/CartPage';
import { InformationPage } from '../../src/pages/InformationPage';
import { OverviewPage } from '../../src/pages/OverviewPage';
import { FinishPage } from '../../src/pages/FinishPage';
import { users } from '../../src/utils/users';

test('full purchase flow', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const info = new InformationPage(page);
  const overview = new OverviewPage(page);
  const finish = new FinishPage(page);

  // Login
  await login.goto();
  await login.login(users.STANDARD.username, users.STANDARD.password);
  await products.expectVisible();

  // Add items
  const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
  for (const name of items) await products.addProductByName(name);
  await expect(products.cartBadge).toBeTruthy();

  // Go to cart and assert
  await products.openCart();
  await cart.expectVisible();
  await expect.soft(await cart.itemNames()).toEqual(items);

  // Checkout: information
  await cart.checkout();
  await info.expectVisible();
  await info.fillAndContinue('John', 'Doe', '90210');

  // Overview assertions
  await overview.expectVisible();
  await expect.soft(await overview.listItemNames()).toEqual(items);
  await overview.expectTotalsVisible();

  // Finish
  await overview.finish();
  await finish.expectVisible();
  await finish.expectThankYou();

  // Back home
  await finish.backToProducts();
  await products.expectVisible();
});
