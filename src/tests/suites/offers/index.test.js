const userData = require("../../../../resources/data/users.json");

describe("Offers Test", () => {
	this.tags = ["offers"];

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
			.setValue("#username input", "fav_user")
			.click(userData.fav_user.selector)
			.clearValue("#password input")
			.setValue("#password input", userData.fav_user.password)
			.click(userData[userData.fav_user.password].selector)
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
