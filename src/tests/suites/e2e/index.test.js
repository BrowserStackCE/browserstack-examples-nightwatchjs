describe("e2e Test", () => {
	this.tags = ["e2e", "single"];

	beforeEach((browser, done) => {
		if (!browser.options.desiredCapabilities.real_mobile) {
			browser.windowMaximize();
		}
		browser
			.url(browser.launchUrl)
			.waitForElementPresent(".shelf-item")
			.assert.title("StackDemo");
		done();
	});

	afterEach((browser, done) => {
		browser.execute("sessionStorage.clear()").pause(100);
		done();
	});

	it("Testing buy flow", (browser) => {
		let loginPage = browser.page.login();

		loginPage.navigate().login("fav_user");

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
		const errors = browser.currentTest.results.errors,
			failed = browser.currentTest.results.failed,
			retries = browser.currentTest.results.retries || 0,
			passed = browser.currentTest.results.passed,
			skipped = browser.currentTest.results.skipped;

		browser
			.execute(
				`browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"${
					errors + failed - retries > 0 ? "failed" : "passed"
				}","reason": "${errors} - errors ${failed} - failed - ${retries} - retried ${passed} - passed ${skipped} - skipped"}}`
			)
			.pause(1000)
			.end();
		done();
	});
});
