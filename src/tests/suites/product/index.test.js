describe("Product Tests", () => {
	this.tags = ["product"];

	beforeEach((browser, done) => {
		browser.url(browser.launchUrl).assert.title("StackDemo");
		done();
	});

	afterEach((browser, done) => {
		browser.execute("sessionStorage.clear()");
		done();
	});

	it("Apple And Samsung Filter", (browser) => {
		browser.expect.elements(".shelf-item__title").count.to.equal(25);

		browser
			.click("xpath", "//span[contains(text(), 'Apple')]")
			.click("xpath", "//span[contains(text(), 'Samsung')]");
		// .pause(5000);

		browser.expect.elements(".shelf-item").count.to.equal(16);
	});

	it("Apply 'Lowest to Highest' Order By Filter for prices", (browser) => {
		browser
			.click(".sort select option[value='lowestprice']")
			.waitForElementPresent("xpath", "//*[@class = 'shelf-item'][1]")
			.expect.element(
				"/html/body/div/div/div/main/div[2]/div[2]/div[3]/div[1]/b",
				"xpath"
			)
			.text.to.equal("399");
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
