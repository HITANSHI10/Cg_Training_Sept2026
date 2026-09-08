import { test, expect } from '@playwright/test';

async function loginAsStandardUser(page) {
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html/);
}

test.describe('Cart', () => {
  test('adds, removes, preserves, and resets cart state', async ({ page }) => {
    await loginAsStandardUser(page);
    await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).getByRole('button', { name: 'Add to cart' }).click();
    await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bike Light' }).getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    await page.locator('.shopping_cart_link').click();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light', { exact: true })).toBeVisible();
    await page.locator('.cart_item').filter({ hasText: 'Sauce Labs Bike Light' }).getByRole('button', { name: 'Remove' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await page.locator('.shopping_cart_link').click();
    await expect(page.getByText('Sauce Labs Bike Light', { exact: true })).not.toBeVisible();
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Reset App State' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });
});
