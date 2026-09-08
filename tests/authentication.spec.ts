import { test, expect } from '@playwright/test';

const users = require('../test-data/users.json');
const appUrl = 'https://www.saucedemo.com/';

async function openLogin(page) {
	await page.goto(appUrl);
	await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
}

async function login(page, username: string) {
	await page.getByRole('textbox', { name: 'Username' }).fill(username);
	await page.getByRole('textbox', { name: 'Password' }).fill(users.login.password);
	await page.getByRole('button', { name: 'Login' }).click();
}

test.describe('Authentication', () => {
	test('rejects blank, invalid, and locked-out login attempts', async ({ page }) => {
		await openLogin(page);
		await page.getByRole('button', { name: 'Login' }).click();
		await expect(page.getByText('Username is required')).toBeVisible();
		await page.getByRole('textbox', { name: 'Username' }).fill('invalid_user');
		await page.getByRole('textbox', { name: 'Password' }).fill('invalid_password');
		await page.getByRole('button', { name: 'Login' }).click();
		await expect(page.getByText('Username and password do not match any user in this service')).toBeVisible();
		await page.getByRole('textbox', { name: 'Username' }).fill('locked_out_user');
		await page.getByRole('textbox', { name: 'Password' }).fill(users.login.password);
		await page.getByRole('button', { name: 'Login' }).click();
		await expect(page.getByText('Sorry, this user has been locked out.')).toBeVisible();
	});

	for (const username of ['problem_user', 'performance_glitch_user', 'error_user', 'visual_user']) {
		test('authenticates ' + username, async ({ page }) => {
			await openLogin(page);
			await login(page, username);
			await expect(page).toHaveURL(/inventory\.html/);
			await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
		});
	}
});
