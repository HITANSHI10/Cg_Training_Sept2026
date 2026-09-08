import { test, expect } from '@playwright/test';

async function startCheckout(page) {
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).getByRole('button', { name: 'Add to cart' }).click();
  await page.locator('.shopping_cart_link').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL(/checkout-step-one\.html/);
}

test.describe('Checkout', () => {
  test('completes checkout with valid customer information', async ({ page }) => {
    await startCheckout(page);
    await page.getByRole('textbox', { name: 'First Name' }).fill('Test');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Customer');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('12345');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
  });

  test('blocks checkout when required data is absent', async ({ page }) => {
    await startCheckout(page);
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText('Error: First Name is required')).toBeVisible();
  });
});
