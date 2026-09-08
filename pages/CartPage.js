class CartPage {
	constructor(page) {
		this.page = page;
		this.cartProducts = page.locator('[data-test="inventory-item"]');
		this.checkoutButton = page.locator('[data-test="checkout"]');
	}

	async getProducts() {
		return this.cartProducts.locator('[data-test="inventory-item-name"]').allTextContents();
	}

	async checkout() {
		await this.checkoutButton.click();
	}
}

module.exports = { CartPage };
