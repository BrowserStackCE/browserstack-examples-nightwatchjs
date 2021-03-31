const userData = require("../../../../resources/data/users.json");
const commonHooks = require("../../utils/hooks");

describe("User Tests", () => {
	this.tags = ["user"];

	beforeEach(commonHooks.beforeEach);

	afterEach(commonHooks.afterEach);

	it("Number of orders != 0", (browser) => {
		browser
			.refresh()
			.assert.elementPresent("#signin")
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
			.assert.elementPresent("#signin")
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
			.click("[id='1'] .shelf-stopper button")
			.click("#favourites")
			.pause(1000)
			.assert.containsText("p.shelf-item__title", "iPhone 12");
	});

	it("Item Images not available for 'image_not_loading_user'", (browser) => {
		browser
			.refresh()
			.assert.elementPresent("#signin")
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

	after(commonHooks.after);
});
