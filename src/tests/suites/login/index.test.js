const userData = require("../../../../resources/data/users.json");
const commonHooks = require("../../utils/hooks");

describe("Login Tests", () => {
	this.tags = ["login"];

	beforeEach(commonHooks.beforeEach);

	afterEach(commonHooks.afterEach);

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

	after(commonHooks.after);
});
