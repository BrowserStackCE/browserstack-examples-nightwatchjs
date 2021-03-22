describe("Login Tests", () => {
	this.tags = ["login"];

	beforeEach((browser, done) => {
		browser.url(browser.launchUrl).assert.title("StackDemo");
		done();
	});

	afterEach((browser, done) => {
		browser.execute("sessionStorage.clear()");
		done();
	});

	it("Locked Account Test", (browser) => {
		browser
			.click("#signin")
			.clearValue("#username input")
			.setValue("#username input", "locked_user\n")
			.clearValue("#password input")
			.setValue("#password input", "testingisfun99")
			.click("#react-select-3-option-0-0")
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
