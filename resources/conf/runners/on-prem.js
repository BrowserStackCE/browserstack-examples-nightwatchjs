const defaultConf = require("./generic");

module.exports = {
	...defaultConf,
	webdriver: {
		start_process: true,
		server_path: require("chromedriver").path,
		port: 9515,
	},

	test_settings: {
		default: {
			launch_url: "https://bstackdemo.com",
			desiredCapabilities: {
				browserName: "chrome",
			},
		},
	},
};
