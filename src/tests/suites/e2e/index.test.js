const commonHooks = require("../../utils/hooks");


describe("e2e Test", () => {
	this.tags = ["e2e", "single"];

	beforeEach(commonHooks.beforeEach);

	it("Testing buy flow", (browser) => {
		let loginPage = browser.page.login();

		loginPage.navigate().login("fav_user");

		let homePage = browser.page.home();

		homePage.assert.not.elementPresent("#signin").addiPhonesToCartAndCheckout();

		let checkoutPage = browser.page.checkout();

		checkoutPage.enterDetailAndSubmit(
			"firstname",
			"lastname",
			"address",
			"state",
			111111
		);

		let orderConfirmationPage = browser.page.order_confirmation();
		if (browser.globals.bsEnv) {
			orderConfirmationPage.downloadPdfOnRemoteDevice();
			orderConfirmationPage.downloadedFileExists(browser,"confirmation.pdf");
		}
		orderConfirmationPage.continueShopping();

		let ordersPage = browser.page.orders();

		ordersPage.navigate().checkIfNOrdersPlaced(3);
	});

});
