const userData = require("../../../../resources/data/users.json");
const commonHooks = require("../../utils/hooks");

describe("Login Tests", () => {
	this.tags = ["login"];

	beforeEach(commonHooks.beforeEach);

	

	it("Locked Account Test", (browser) => {
		browser
			.click("#signin")
			.clearValue("#username input")
			.setValue("#username input", "locked_user" + browser.Keys.ENTER)
			.clearValue("#password input")
			.setValue("#password input", "testingisfun99" + browser.Keys.ENTER)
			.click("#login-btn")
			.assert.containsText(".api-error", "Your account has been locked.");
	});

	it("Navigate to Favourites Fails", (browser) => {
		browser
			.click("#favourites")
			.assert.urlEquals(browser.launchUrl + "/signin?favourites=true");
	});

	
});
