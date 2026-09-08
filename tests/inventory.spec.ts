import { test, expect } from '@playwright/test';

const users = require('../test-data/users.json');
const appUrl = 'https://www.saucedemo.com/';
const products = [...users.products, 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie', 'Test.allTheThings() T-Shirt (Red)'];

async function loginAsStandardUser(page) {
	await page.goto(appUrl);
	await page.getByRole('textbox', { name: 'Username' }).fill(users.login.username);
	await page.getByRole('textbox', { name: 'Password' }).fill(users.login.password);
	await page.getByRole('button', { name: 'Login' }).click();
	await expect(page).toHaveURL(/inventory\.html/);
}

test.describe('Inventory and Product Details', () => {
	test('displays the complete six-item catalog', async ({ page }) => {
		await loginAsStandardUser(page);
		await expect(page.getByText('Products', { exact: true })).toBeVisible();
		await expect(page.locator('.inventory_item')).toHaveCount(6);
		for (const product of products) {
			const item = page.locator('.inventory_item').filter({ hasText: product });
			await expect(item).toBeVisible();
			await expect(item.locator('.inventory_item_desc')).toBeVisible();
			await expect(item.locator('.inventory_item_price')).toBeVisible();
			await expect(item.getByRole('button', { name: 'Add to cart' })).toBeVisible();
		}
	});

	test('sorts inventory by name and price', async ({ page }) => {
		await loginAsStandardUser(page);
		const sort = page.locator('.product_sort_container');
		await sort.selectOption('za');
		const namesDescending = await page.locator('.inventory_item_name').allTextContents();
		expect(namesDescending).toEqual([...namesDescending].sort().reverse());
		await sort.selectOption('lohi');
		const pricesAscending = (await page.locator('.inventory_item_price').allTextContents()).map((price) => Number(price.replace('$', '')));
		expect(pricesAscending).toEqual([...pricesAscending].sort((a, b) => a - b));
		await sort.selectOption('hilo');
		const pricesDescending = (await page.locator('.inventory_item_price').allTextContents()).map((price) => Number(price.replace('$', '')));
		expect(pricesDescending).toEqual([...pricesDescending].sort((a, b) => b - a));
	});

	test('opens product detail and returns to inventory', async ({ page }) => {
		await loginAsStandardUser(page);
		await page.getByRole('link', { name: users.products[0] }).first().click();
		await expect(page).toHaveURL(/inventory-item\.html/);
		await expect(page.locator('.inventory_details_name')).toHaveText(users.products[0]);
		await expect(page.locator('.inventory_details_desc')).toBeVisible();
		await expect(page.locator('.inventory_details_price')).toHaveText('$29.99');
		await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
		await page.getByRole('button', { name: 'Back to products' }).click();
		await expect(page).toHaveURL(/inventory\.html/);
	});
});
