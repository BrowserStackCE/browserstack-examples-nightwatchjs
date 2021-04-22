module.exports.beforeEach = (browser, done) => {
	if (!browser.options.desiredCapabilities.real_mobile) {
		browser.windowMaximize();
	}
	browser
		.url(browser.launchUrl)
		.waitForElementPresent(".shelf-item")
		.assert.title("StackDemo");
	done();
};

module.exports.afterEach = (browser, done) => {
	browser.execute("sessionStorage.clear()", [], done);
};

module.exports.after = (browser, done) => {
	const errors = browser.currentTest.results.errors,
		failed = browser.currentTest.results.failed,
		retries = browser.currentTest.results.retries || 0,
		passed = browser.currentTest.results.passed,
		skipped = browser.currentTest.results.skipped;

	if (browser.globals.bsEnv) {
		browser
			.execute(
				`browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"${
					errors + failed - retries > 0 ? "failed" : "passed"
				}","reason": "${errors} - errors ${failed} - failed - ${retries} - retried ${passed} - passed ${skipped} - skipped"}}`
			)
			.pause(1000)
			.end(done);
	} else {
		browser.end(done);
	}
};
