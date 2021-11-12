const commonHooks = require("../../utils/hooks");

describe("Accessibility Tests", () => {
	this.tags = ["accessibility"];

	beforeEach(commonHooks.beforeEach);

	afterEach(commonHooks.afterEach);

	it("Accessibility Test", (browser) => {
		browser
			.click('#signin')	
			.verify
			.visible('.login_wrapper');
		
		browser
			.axeInject()
			.axeRun('html', {
				rules: {'color-contrast': { enabled: true }}
			})
			.end();
	});
	after(commonHooks.after);
});
