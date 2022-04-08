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

module.exports = {
	src_folders: ["src/tests/mobile"],
	output_folder: "results",

	page_objects_path: "src/app/pages/",
	custom_commands_path: ["./node_modules/nightwatch-axe-verbose/src/commands"],
	"test_settings" : {
        "default" : {
          "launch_url" : "",
          "selenium_port"  : 443,
          "selenium_host"  : "hub-cloud.browserstack.com",
          "silent": true,
          "screenshots" : {
            "enabled" : true,
            "on_failure" : true,
            "on_error" : false,
            "path" : "./screenshot"
          }
        },
        "androidNative":{
            "desiredCapabilities": {
                "os_version" : "9.0",
                "device" : "Google Pixel 3",
                "app" : "BrowserStackDemoAppApk",
                "project" : "Demo",
                "build" : "Build1",
                "name" : "Test1",
                "browserstack.appium_version" : "1.22.0"
            }
          },
          "iOSNative":{
            "desiredCapabilities": {
                "os_version" : "15",
                "device" : "iPhone 13 Pro Max",
                "app" : "BrowserStackDemoAppIPA",
                "project" : "Demo",
                "build" : "Build2",
                "name" : "Test2",
                "browserstack.appium_version" : "1.22.0"
            }
          },
    },    
};
