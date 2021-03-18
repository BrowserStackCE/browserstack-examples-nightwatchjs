const defaultConf = require("./generic");
const bsConfig = require("../caps/nightwatch.self_hosted.json");

if (process.env.BROWSERSTACK_USERNAME !== undefined) {
	process.env.BROWSERSTACK_USER = process.env.BROWSERSTACK_USERNAME;
}
if (process.env.BROWSERSTACK_ACCESS_KEY !== undefined) {
	process.env.BROWSERSTACK_KEY = process.env.BROWSERSTACK_ACCESS_KEY;
}

const browsers = {};
const launchUrl = defaultConf.test_settings.default.launch_url;
const browserstackRunConfig = { launch_url: launchUrl };

for (let key in bsConfig) {
	switch (key) {
		case "server":
			const serverAndPort = bsConfig.server.split(":");
			browserstackRunConfig["selenium"] = {
				host: serverAndPort[0],
				port: serverAndPort.length === 2 ? serverAndPort[1] : 443,
			};
			break;
		case "build":
			if (browserstackRunConfig["desiredCapabilities"] === undefined) {
				browserstackRunConfig["desiredCapabilities"] = {};
			}
			browserstackRunConfig["desiredCapabilities"].build = bsConfig.build;
			break;
		case "project":
			if (browserstackRunConfig["desiredCapabilities"] === undefined) {
				browserstackRunConfig["desiredCapabilities"] = {};
			}
			browserstackRunConfig["desiredCapabilities"].project = bsConfig.project;
			break;
		default:
			let browserCaps = bsConfig[key];
			browsers[key] = {
				...browserstackRunConfig,
				desiredCapabilities: { ...browserstackRunConfig.desiredCapabilities },
			};
			for (let cap in browserCaps) {
				browsers[key]["desiredCapabilities"][cap] = browserCaps[cap];
			}
			break;
	}
}

module.exports = {
	...defaultConf,
	webdriver: {
		keep_alive: true,
		timeout_options: {
			timeout: 100000,
			retry_attempts: 3,
		},
	},

	test_workers: {
		enabled: true,
		workers: 2,
		node_options: "inherit",
	},

	test_settings: {
		...defaultConf.test_settings,

		browserstack: browserstackRunConfig,

		...browsers,
	},
};
