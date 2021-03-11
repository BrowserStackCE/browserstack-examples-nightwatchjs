// module.exports = {
// 	"Google's Search Functionality": function (browser) {
// 		browser
// 			.url("https://www.google.com/ncr")
// 			.waitForElementVisible("body", 1000)
// 			.setValue("input[type=text]", "BrowserStack")
// 			.click("input[name=btnK]")
// 			.pause(1000)
// 			.assert.title("BrowserStack - Google Search")
// 			.end();
// 	},
// };

describe("Login Tests", () => {
	this.tags = ["login", "smoke"];

	it("Locked Account Test", (browser) => {
		browser.url("https://bstackdemo.com").assert.title("StackDemo");

		browser.click("#signin");

		browser
			.clearValue("#username input")
			.setValue("#username input", "locked_user\n")
			.clearValue("#password input")
			.setValue("#password input", "testingisfun99\n")
			.click("#login-btn")
			.assert.containsText(".api-error", "Your account has been locked.");
	});

	it("Navigate to Favourites", (browser) => {
		browser
			.url("https://bstackdemo.com")
			.click("#favourites")
			.assert.urlEquals("https://bstackdemo.com/signin?favourites=true");
	});

	after((browser) => browser.end());
});
