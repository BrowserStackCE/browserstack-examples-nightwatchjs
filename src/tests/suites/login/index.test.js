describe("Login Tests", () => {
	this.tags = ["login"];

	beforeEach((browser, done) => {
		browser.url(browser.launchUrl).assert.title("StackDemo");
		done();
	});

	afterEach((browser, done) => {
		browser.execute("sessionStorage.clear()");
		done();
	});

	it("Locked Account Test", (browser) => {
		browser
			.click("#signin")
			.clearValue("#username input")
			.setValue("#username input", "locked_user\n")
			.clearValue("#password input")
			.setValue("#password input", "testingisfun99\n")
			.click("#login-btn")
			.assert.containsText(".api-error", "Your account has been locked.");
	});

	it("Navigate to Favourites Fails", (browser) => {
		browser
			.click("#favourites")
			.assert.urlEquals("https://bstackdemo.com/signin?favourites=true");
	});

	after((browser, done) => {
		browser.end();
		done();
	});
});
