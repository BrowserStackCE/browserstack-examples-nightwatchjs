module.exports = {
	url: function () {
		return this.api.launchUrl;
	},
	elements: {
		cartButton: { selector: ".bag--float-cart-closed" },
		closeCartButton: { selector: ".float-cart__close-btn" },
		checkoutButton: { selector: ".buy-btn" },
		iPhone12CartButton: { selector: '[id="1"] .shelf-item__buy-btn' },
		iPhone12MiniCartButton: { selector: '[id="2"] .shelf-item__buy-btn' },
		iPhone12ProMaxCartButton: { selector: '[id="3"] .shelf-item__buy-btn' },
	},
	commands: [
		{
			addiPhonesToCartAndCheckout: function () {
				return this.click("@iPhone12CartButton")
					.click("@closeCartButton")
					.click("@iPhone12MiniCartButton")
					.click("@closeCartButton")
					.click("@iPhone12ProMaxCartButton")
					.click("@checkoutButton");
			},
		},
	],
};
