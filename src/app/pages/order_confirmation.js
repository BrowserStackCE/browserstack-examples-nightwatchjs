module.exports = {
	url: function () {
		return this.api.launchUrl + "/confirmation";
	},
	elements: {
		continueShoppingButton: ".optimizedCheckout-buttonSecondary",
        downloadPdfLink: "#downloadpdf"
	},
	commands: [
		{
			continueShopping: function () {
				return this.click("@continueShoppingButton");
			},
			downloadPdf: function () {
                this.assert.urlEquals(this.url());
				return this.click("@downloadPdfLink");
			},
            downloadedFileExists: function (browser, fileName) {
                browser.pause(1000);
                browser.execute(`browserstack_executor: {"action": "fileExists", "arguments": {"fileName": "${fileName}"}}`
                ,[]
                ,function(result) {
                    browser.assert.ok(result.value)
                });
			},
		},
	],
};
