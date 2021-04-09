#!/usr/bin/env node

const Nightwatch = require("nightwatch");
const browserstack = require("browserstack-local");
let bs_local;

try {
	const pathToNightwatchExecutable = "./node_modules/nightwatch/bin/nightwatch";
	require.main.filename = pathToNightwatchExecutable;
	process.mainModule.filename = pathToNightwatchExecutable;
	// Code to start browserstack local before start of test
	console.log("Connecting local");
	Nightwatch.bs_local = bs_local = new browserstack.Local();
	bs_local.start(
		{ key: process.env.BROWSERSTACK_ACCESS_KEY },
		function (error) {
			if (error) throw error;

			console.log("Connected. Now testing...");
			Nightwatch.cli(function (argv) {
				Nightwatch.CliRunner(argv)
					.setup(null, function () {
						// Code to stop browserstack local after end of parallel test
						bs_local.stop(function () {});
					})
					.runTests(function () {
						// Code to stop browserstack local after end of single test
						bs_local.stop(function () {});
					});
			});
		}
	);
} catch (ex) {
	console.log("There was an error while starting the test runner:\n\n");
	process.stderr.write(ex.stack + "\n");
	process.exit(2);
}
