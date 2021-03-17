describe("e2e Test", () => {
	this.tags = ["e2e"];

	beforeEach((browser, done) => {
		browser
			.windowMaximize()
			.url("https://bstackdemo.com")
			.assert.title("StackDemo");
		done();
	});

	afterEach((browser, done) => {
		browser.execute("sessionStorage.clear()");
		done();
	});

	it("Testing buy flow", (browser) => {
		let loginPage = browser.page.login();

		loginPage.navigate().login("fav_user", "testingisfun99");

		let homePage = browser.page.home();

		homePage.navigate().addiPhonesToCartAndCheckout();

		let checkoutPage = browser.page.checkout();

		checkoutPage.enterDetailAndSubmit(
			"browserstack",
			"exmaple",
			"Oberoi Complex, Mumbai, India",
			"Maharashtra",
			400088
		);

		browser.click(".optimizedCheckout-buttonSecondary"); // confirmation page checkout

		let ordersPage = browser.page.orders();

		ordersPage.navigate().checkIfNOrdersPlaced(3);
	});

	after((browser, done) => {
		browser.end();
		done();
	});
});
