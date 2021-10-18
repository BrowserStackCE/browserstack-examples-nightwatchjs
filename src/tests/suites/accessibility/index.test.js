const commonHooks = require("../../utils/hooks");

describe("Accessibility Tests", () => {
	this.tags = ["accessibility"];

	beforeEach(commonHooks.beforeEach);

	afterEach(commonHooks.afterEach);

	it("Accessibility Test", (browser) => {
		browser
            .axeInject()
            .axeRun('html', {
                rules: {}
            })
            .end();
	});
	after(commonHooks.after);
});
