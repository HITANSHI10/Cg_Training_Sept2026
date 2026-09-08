class InventoryPage {
	constructor(page) {
		this.page = page;
		this.inventoryPage = page.locator('[data-test="inventory-container"]');
		this.product = page.locator('[data-test="inventory-item"]');
		this.cartLink = page.locator('[data-test="shopping-cart-link"]');
		this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
	}

	async addProduct(productName) {
		const product = this.product.filter({ hasText: productName });
		await product.getByRole('button', { name: 'Add to cart' }).click();
	}

	async addProducts(products) {
		for (const productName of products) {
			await this.addProduct(productName);
		}
	}

	async openCart() {
		await this.cartLink.click();
	}

	async getCartCount() {
		if (await this.cartBadge.count() === 0) {
			return 0;
		}

		return Number(await this.cartBadge.textContent());
	}
}

module.exports = { InventoryPage };
