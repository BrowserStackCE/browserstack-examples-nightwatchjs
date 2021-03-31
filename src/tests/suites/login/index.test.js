const userData = require("../../../../resources/data/users.json");

describe("Login Tests", () => {
	this.tags = ["login"];

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

	it("Locked Account Test", (browser) => {
		browser
			.click("#signin")
			.clearValue("#username input")
			.setValue("#username input", "locked_user")
			.click(userData.locked_user.selector)
			.clearValue("#password input")
			.setValue("#password input", "testingisfun99")
			.click(userData[userData.locked_user.password].selector)
			.click("#login-btn")
			.assert.containsText(".api-error", "Your account has been locked.");
	});

	it("Navigate to Favourites Fails", (browser) => {
		browser
			.click("#favourites")
			.assert.urlEquals(browser.launchUrl + "/signin?favourites=true");
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
