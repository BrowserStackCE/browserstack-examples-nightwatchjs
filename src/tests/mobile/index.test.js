describe("Demo Tests", () => {
	

	it("Test", (browser) => {
		browser
		.useXpath()
			.click("//android.view.ViewGroup[@content-desc='menu']")
			.click("//android.view.ViewGroup[@content-desc='nav-signin']");
	});
	
});
