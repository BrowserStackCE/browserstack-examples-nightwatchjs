describe("Offers Test", () => {
	this.tags = ["offers"];

	beforeEach((browser, done) => {
		browser
			.windowMaximize()
			.url(browser.launchUrl)
			.waitForElementVisible(".shelf-item")
			.assert.title("StackDemo");
		done();
	});

	afterEach((browser, done) => {
		browser.execute("sessionStorage.clear()");
		done();
	});

	it("Number of Items in offers != 0", (browser) => {
		browser.execute(
			"navigator.geolocation.getCurrentPosition = function(cb){cb({ coords: {accuracy: 20,altitude: null,altitudeAccuracy: null,heading: null,latitude: 19.043192,longitude: 72.86305240000002,speed: null}}); }"
		);
		browser.execute(
			"window.navigator.geolocation.getCurrentPosition = function(cb){cb({ coords: {accuracy: 20,altitude: null,altitudeAccuracy: null,heading: null,latitude: 19.043192,longitude: 72.86305240000002,speed: null}}); }"
		);

		browser
			.click("#signin")
			.clearValue("#username input")
			.setValue("#username input", "fav_user\n")
			.clearValue("#password input")
			.setValue("#password input", "testingisfun99")
			.click("#react-select-3-option-0-0")
			.click("#login-btn")
			.pause(1000)
			.click("#offers")
			.pause(1000)
			.expect.elements(".offer")
			.count.to.not.equal(0);
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
