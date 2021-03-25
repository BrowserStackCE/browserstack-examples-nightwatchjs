const userData = require("../../../../resources/data/users.json");

describe("User Tests", () => {
	this.tags = ["user"];

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

	it("Number of orders != 0", (browser) => {
		browser
			.refresh()
			.click("#signin")
			.clearValue("#username input")
			.setValue("#username input", "existing_orders_user")
			.click(userData.existing_orders_user.selector)
			.clearValue("#password input")
			.setValue("#password input", userData.existing_orders_user.password)
			.click(userData[userData.existing_orders_user.password].selector)
			.click("#login-btn")
			.pause(1000)
			.assert.containsText(".username", "existing_orders_user")
			.click("#orders")
			.expect.elements(".order")
			.count.to.not.equal(0);
	});

	it("Number of favouriters != 0", (browser) => {
		browser
			.refresh()
			.click("#signin")
			.clearValue("#username input")
			.setValue("#username input", "existing_orders_user")
			.click(userData.existing_orders_user.selector)
			.clearValue("#password input")
			.setValue("#password input", userData.existing_orders_user.password)
			.click(userData[userData.existing_orders_user.password].selector)
			.click("#login-btn")
			.pause(1000)
			.assert.containsText(".username", "existing_orders_user")
			.click("xpath", "//p[text() = 'iPhone 12']/../div/button")
			.click("#favourites")
			.pause(1000)
			.assert.containsText("p.shelf-item__title", "iPhone 12");
	});

	it("Item Images not available for 'image_not_loading_user'", (browser) => {
		browser
			.click("#signin")
			.clearValue("#username input")
			.setValue("#username input", "image_not_loading_user")
			.click(userData.image_not_loading_user.selector)
			.clearValue("#password input")
			.setValue("#password input", userData.image_not_loading_user.password)
			.click(userData[userData.image_not_loading_user.password].selector)
			.click("#login-btn")
			.pause(1000)
			.assert.not.containsText(".username", "image_not_loading_user");
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
