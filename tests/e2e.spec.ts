import { test, expect } from '@playwright/test';

const testData = require('../test-data/users.json');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('SauceDemo complete checkout', () => {
  test('completes checkout using JSON test data', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await loginPage.open();
    await loginPage.login(testData.login.username, testData.login.password);
    await expect(inventoryPage.inventoryPage).toBeVisible();
    await inventoryPage.addProducts(testData.products);
    await expect(inventoryPage.cartBadge).toHaveText(String(testData.products.length));
    await inventoryPage.openCart();
    await expect(cartPage.cartProducts).toHaveCount(testData.products.length);
    await expect.poll(() => cartPage.getProducts()).toEqual(testData.products);
    await cartPage.checkout();
    await checkoutPage.enterCustomerDetails(testData.customer.firstName, testData.customer.lastName, testData.customer.postalCode);
    await checkoutPage.continue();
    await checkoutPage.finishOrder();
    await expect(checkoutPage.successMessage).toHaveText('Thank you for your order!');
  });
});
