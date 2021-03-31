const genericConfig = require("./generic");
const dockerConfig = require("../caps/docker.json");

const browsers = {};
const launchUrl =
	dockerConfig.defaultUrl || genericConfig.test_settings.default.launch_url;
const browserstackRunConfig = { launch_url: launchUrl };

for (let key in dockerConfig) {
	switch (key) {
		case "server":
			const serverAndPort = dockerConfig.server.split(":");
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
			browserstackRunConfig["desiredCapabilities"].build = dockerConfig.build;
			break;
		case "project":
			if (browserstackRunConfig["desiredCapabilities"] === undefined) {
				browserstackRunConfig["desiredCapabilities"] = {};
			}
			browserstackRunConfig["desiredCapabilities"].project =
				dockerConfig.project;
			break;
		default:
			let browserCaps = dockerConfig[key];
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
		workers: 2,
		node_options: "inherit",
	},

	test_settings: {
		...genericConfig.test_settings,

		browserstack: browserstackRunConfig,

		...browsers,
	},
};
