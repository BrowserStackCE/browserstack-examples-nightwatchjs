const baseConfig = require("./base_config");

module.exports = {
	...baseConfig,
	webdriver: {
		start_process: true,
		server_path: require("chromedriver").path,
		port: 9515,
	},
	test_workers: {
		enabled: true,
		workers: 2,
		node_options: "inherit",
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
