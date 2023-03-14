module.exports.beforeEach = (browser, done) => {
	if (!browser.options.desiredCapabilities.real_mobile) {
		browser.windowMaximize();
	}
	browser
		.url(browser.launchUrl)
		.waitForElementPresent(".shelf-item")
		.assert.titleEquals("StackDemo");
	done();
};