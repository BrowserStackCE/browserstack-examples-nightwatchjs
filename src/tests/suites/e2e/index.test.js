const commonHooks = require("../../utils/hooks");

describe("e2e Test", () => {
	this.tags = ["e2e", "single"];

	beforeEach(commonHooks.beforeEach);

	afterEach(commonHooks.afterEach);

	it("Testing buy flow", (browser) => {
		let loginPage = browser.page.login();

		loginPage.navigate().login("fav_user");

		let homePage = browser.page.home();

		homePage.navigate().addiPhonesToCartAndCheckout();

		let checkoutPage = browser.page.checkout();

		checkoutPage.enterDetailAndSubmit(
			"firstname",
			"lastname",
			"address",
			"state",
			111111
		);

		browser.click(".optimizedCheckout-buttonSecondary"); // confirmation page checkout

		let ordersPage = browser.page.orders();

		ordersPage.navigate().checkIfNOrdersPlaced(3);
	});

	after(commonHooks.after);
});
