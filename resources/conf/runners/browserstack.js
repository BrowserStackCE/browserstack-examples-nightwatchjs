const genericConfig = require("./generic");
const bsConfig = require("../caps/browserstack.json");

if (process.env.BROWSERSTACK_USERNAME !== undefined) {
	process.env.BROWSERSTACK_USER = process.env.BROWSERSTACK_USERNAME;
}
if (process.env.BROWSERSTACK_ACCESS_KEY !== undefined) {
	process.env.BROWSERSTACK_KEY = process.env.BROWSERSTACK_ACCESS_KEY;
}

const browsers = {};
const launchUrl =
	bsConfig.defaultUrl || genericConfig.test_settings.default.launch_url;
const browserstackRunConfig = { launch_url: launchUrl };

for (let key in bsConfig) {
	switch (key) {
		case "server":
			const serverAndPort = bsConfig.server.split(":");
			genericConfig["selenium"] = {
				start_process: false,
				host: serverAndPort[0],
				port: serverAndPort.length === 2 ? serverAndPort[1] : 443,
			};
			browserstackRunConfig["selenium_host"] = serverAndPort[0];
			browserstackRunConfig["selenium_port"] =
				serverAndPort.length === 2 ? serverAndPort[1] : 443;
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
		case "username":
			if (!process.env.BROWSERSTACK_USER)
				process.env.BROWSERSTACK_USER = bsConfig.username;
			break;
		case "password":
			if (!process.env.BROWSERSTACK_KEY)
				process.env.BROWSERSTACK_KEY = bsConfig.access_key;
			break;
		default:
			let browserCaps = bsConfig[key];
			browsers[key] = {
				...browserstackRunConfig,
				desiredCapabilities: { ...browserstackRunConfig.desiredCapabilities },
			};
			if (browserCaps["defaultUrl"]) {
				browsers[key].launch_url = browserCaps["defaultUrl"];
				delete browserCaps["defaultUrl"];
			}
			for (let cap in browserCaps) {
				browsers[key]["desiredCapabilities"][cap] = browserCaps[cap];
			}
			browserCaps["selenium_host"] = genericConfig.selenium.host;
			browserCaps["selenium_port"] = genericConfig.selenium.port;
			break;
	}
}

module.exports = {
	...genericConfig,
	webdriver: {
		keep_alive: true,
		timeout_options: {
			timeout: 100000,
			retry_attempts: 3,
		},
	},

	test_workers: {
		enabled: true,
		workers: 10,
		node_options: "inherit",
	},

	test_settings: {
		...genericConfig.test_settings,

		browserstack: browserstackRunConfig,

		...browsers,
	},
};
