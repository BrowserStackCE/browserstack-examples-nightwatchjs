const userData = require("../../../../resources/data/users.json");
const commonHooks = require("../../utils/hooks");

describe("Offers Test", () => {
	this.tags = ["offers"];

	beforeEach(commonHooks.beforeEach);

	afterEach(commonHooks.afterEach);

	it("Number of Items in offers != 0", (browser) => {
		browser
			.execute(
				`navigator.geolocation.getCurrentPosition = function(cb){ 
				cb({ 
					coords: {
						accuracy: 20,
						altitude: null,
						altitudeAccuracy: null,
						heading: null,
						latitude: 19,
						longitude: 75,
						speed: null
					}
				}); 
			}`
			)
			.execute(
				`window.navigator.geolocation.getCurrentPosition = function(cb){ 
				cb({ 
					coords: {
						accuracy: 20,
						altitude: null,
						altitudeAccuracy: null,
						heading: null,
						latitude: 19,
						longitude: 75,
						speed: null
					}
				}); 
			}`
			)
			.click("#signin")
			.clearValue("#username input")
			.setValue("#username input", "fav_user" + browser.Keys.ENTER)
			.clearValue("#password input")
			.setValue(
				"#password input",
				userData.fav_user.password + browser.Keys.ENTER
			)
			.click("#login-btn")
			.pause(1000)
			.click("#offers")
			.pause(1000)
			.expect.elements(".offer")
			.count.to.not.equal(0);
	});

	after(commonHooks.after);
});
