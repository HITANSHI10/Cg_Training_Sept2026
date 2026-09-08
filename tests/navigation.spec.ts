import { test, expect } from '@playwright/test';

async function loginAsStandardUser(page) {
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html/);
}

test.describe('Navigation and Session', () => {
  test('uses All Items, logs out, and protects direct inventory access', async ({ page }) => {
    await loginAsStandardUser(page);
    await page.getByRole('link', { name: 'Sauce Labs Backpack' }).first().click();
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'All Items' }).click();
    await expect(page).toHaveURL(/inventory\.html/);
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('.inventory_list')).not.toBeVisible();
  });
});
