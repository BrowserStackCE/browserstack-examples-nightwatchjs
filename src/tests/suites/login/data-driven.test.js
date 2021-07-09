const loginData = require("../../../../resources/data/login.json");
const commonHooks = require("../../utils/hooks");

describe("Login Data Driven Test",() => {
	this.tags = ["data-driven"]

	beforeEach(commonHooks.beforeEach);

	loginData.forEach((loginCase) => {
		it(`${loginCase.username} test`,(browser) => {
			browser
				.click("#signin")
				.clearValue("#username input")
				.setValue("#username input", loginCase.username + browser.Keys.ENTER)
				.clearValue("#password input")
				.setValue("#password input", loginCase.password + browser.Keys.ENTER)
				.click("#login-btn")
				.assert.containsText(".api-error", loginCase.expected_message);
		})
	});

	afterEach(commonHooks.afterEach);
})