const commonHooks = require("../../utils/hooks");

describe("Accessibility Tests", () => {
	this.tags = ["accessibility"];

	beforeEach(commonHooks.beforeEach);

	

	it("Accessibility Test", (browser) => {
		browser
			.click('#signin')	
			.assert
			.visible('.login_wrapper');
		
		browser
			.axeInject()
			.axeRun('html', {
				rules: {'color-contrast': { enabled: true }}
			});
	});
	
});
