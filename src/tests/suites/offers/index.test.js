const userData = require("../../../../resources/data/users.json");
const commonHooks = require("../../utils/hooks");

describe("Offers Test", () => {
	this.tags = ["offers"];

	beforeEach(commonHooks.beforeEach);

	afterEach(commonHooks.afterEach);

	it("Number of Items in offers != 0", (browser) => {
		browser.execute(
			`navigator.geolocation.getCurrentPosition = function(cb){ 
				cb({ 
					coords: {
						accuracy: 20,
						altitude: null,
						altitudeAccuracy: null,
						heading: null,
						latitude: 19.043192,
						longitude: 72.86305240000002,
						speed: null
					}
				}); 
			}`
		);
		browser.execute(
			`window.navigator.geolocation.getCurrentPosition = function(cb){ 
				cb({ 
					coords: {
						accuracy: 20,
						altitude: null,
						altitudeAccuracy: null,
						heading: null,
						latitude: 19.043192,
						longitude: 72.86305240000002,
						speed: null
					}
				}); 
			}`
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

	after(commonHooks.after);
});
