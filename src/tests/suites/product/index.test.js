const commonHooks = require("../../utils/hooks");

describe("Product Tests", () => {
	this.tags = ["product"];

	beforeEach(commonHooks.beforeEach);

	afterEach(commonHooks.afterEach);

	it("Apple And Samsung Filter", (browser) => {
		browser.expect.elements(".shelf-item__title").count.to.equal(25);

		browser
			.click("input[value='Apple'] + span")
			.click("input[value='Samsung'] + span")
			.expect.elements(".shelf-item")
			.count.to.equal(16);
	});

	it("Apply 'Lowest to Highest' Order By Filter for prices", (browser) => {
		browser
			.click(".sort select option[value='lowestprice']")
			.pause(700)
			.waitForElementPresent("div.shelf-container-header + div.shelf-item")
			.expect.element("div.shelf-item__price > div.val > b")
			.text.to.equal("399");
	});

	after(commonHooks.after);
});
