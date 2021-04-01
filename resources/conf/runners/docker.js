const baseConfig = require("./base_config");
const dockerConfig = require("../caps/docker.json");

const browsers = {};
const launchUrl =
	dockerConfig.defaultUrl || baseConfig.test_settings.default.launch_url;
const dockerRunConfig = { launch_url: launchUrl, globals: { dockerEnv: true } };

for (let key in dockerConfig) {
	switch (key) {
		case "server":
			const serverAndPort = dockerConfig.server.split(":");
			baseConfig["selenium"] = {
				start_process: false,
				host: serverAndPort[0],
				port: serverAndPort.length === 2 ? serverAndPort[1] : 443,
			};
			dockerRunConfig["selenium_host"] = serverAndPort[0];
			dockerRunConfig["selenium_port"] =
				serverAndPort.length === 2 ? serverAndPort[1] : 443;
			break;
		case "build":
			if (dockerRunConfig["desiredCapabilities"] === undefined) {
				dockerRunConfig["desiredCapabilities"] = {};
			}
			dockerRunConfig["desiredCapabilities"].build = dockerConfig.build;
			break;
		case "project":
			if (dockerRunConfig["desiredCapabilities"] === undefined) {
				dockerRunConfig["desiredCapabilities"] = {};
			}
			dockerRunConfig["desiredCapabilities"].project = dockerConfig.project;
			break;
		default:
			let browserCaps = dockerConfig[key];
			browsers[key] = {
				...dockerRunConfig,
				desiredCapabilities: { ...dockerRunConfig.desiredCapabilities },
			};
			if (browserCaps["defaultUrl"]) {
				browsers[key].launch_url = browserCaps["defaultUrl"];
				delete browserCaps["defaultUrl"];
			}
			for (let cap in browserCaps) {
				browsers[key]["desiredCapabilities"][cap] = browserCaps[cap];
			}
			browserCaps["selenium_host"] = baseConfig.selenium.host;
			browserCaps["selenium_port"] = baseConfig.selenium.port;
			browserCaps["globals"] = { dockerEnv: true };
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
		workers: 2,
		node_options: "inherit",
	},

	test_settings: {
		...baseConfig.test_settings,

		browserstack: dockerRunConfig,

		...browsers,
	},
};
