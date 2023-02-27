const baseConfig = require("./base_config");
const bsConfig = require("../caps/browserstack.json");
require("dotenv").config();

// Nightwatchjs internally uses BROWSERSTACK_USER and BROWSERSTACK_KEY environment variables to run on BrowserStack platform.
// Hence setting these here as our format across repositories is set BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY
if (
	process.env.BROWSERSTACK_USERNAME !== undefined &&
	process.env.BROWSERSTACK_USER === undefined
) {
	process.env.BROWSERSTACK_USER = process.env.BROWSERSTACK_USERNAME;
}
if (
	process.env.BROWSERSTACK_ACCESS_KEY !== undefined &&
	process.env.BROWSERSTACK_KEY === undefined
) {
	process.env.BROWSERSTACK_KEY = process.env.BROWSERSTACK_ACCESS_KEY;
}

const browsers = {};
const launchUrl =
	bsConfig.defaultUrl || baseConfig.test_settings.default.launch_url;
const browserstackRunConfig = {
	launch_url: launchUrl,
	globals: { bsEnv: true },
};

for (let key in bsConfig) {
	switch (key) {
		case "server":
			const serverAndPort = bsConfig.server.split(":");
			baseConfig["selenium"] = {
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
			browserstackRunConfig["desiredCapabilities"].build =
				process.env.BROWSERSTACK_BUILD_NAME ||
				bsConfig.build +
					"-" +
					Math.trunc(new Date().getTime() / 10000).toString();
			break;
		case "project":
			if (browserstackRunConfig["desiredCapabilities"] === undefined) {
				browserstackRunConfig["desiredCapabilities"] = {};
			}
			browserstackRunConfig["desiredCapabilities"].project =
				bsConfig.project;
			break;
		case "username":
			if (!process.env.BROWSERSTACK_USER)
				process.env.BROWSERSTACK_USER = bsConfig.username;
			break;
		case "access_key":
			if (!process.env.BROWSERSTACK_KEY)
				process.env.BROWSERSTACK_KEY = bsConfig.key;
			break;
		default:
			if (
				key === "username" ||
				key === "defaultUrl" ||
				key === "local_args"
			) {
				continue;
			}
			let browserCaps = bsConfig[key];
			browsers[key] = {
				...browserstackRunConfig,
				desiredCapabilities: {
					...browserstackRunConfig.desiredCapabilities,
				},
			};
			if (browserCaps["defaultUrl"]) {
				browsers[key].launch_url = browserCaps["defaultUrl"];
				delete browserCaps["defaultUrl"];
			}
			for (let cap in browserCaps) {
				browsers[key]["desiredCapabilities"][cap] = browserCaps[cap];
			}
			browsers[key]["desiredCapabilities"][
				"browserstack.localIdentifier"
			] = process.env.BROWSERSTACK_LOCAL_IDENTIFIER;
			browserCaps["selenium_host"] = baseConfig.selenium.host;
			browserCaps["selenium_port"] = baseConfig.selenium.port;
			browserCaps["globals"] = { bsEnv: true };
			browsers[key]['desiredCapabilities']['browserstack.key'] = bsConfig.key;
			break;
	}
}

module.exports = {
	...baseConfig,
	webdriver: {
		keep_alive: true,
		timeout_options: {
			timeout: 100000,
			retry_attempts: 3,
		},
	},
	
	test_workers: {
		enabled: true,
		workers: 5,
		node_options: "inherit",
	},

	test_settings: {
		...baseConfig.test_settings,

		browserstack: browserstackRunConfig,

		...browsers,
	},
	
};
