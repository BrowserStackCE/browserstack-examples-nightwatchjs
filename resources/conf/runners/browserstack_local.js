#!/usr/bin/env node

let Nightwatch = require("nightwatch");
let browserstack = require("browserstack-local");
let bs_local;

try {
	require.main.filename = "./node_modules/nightwatch/bin/nightwatch";
	// process.mainModule.filename = "./node_modules/nightwatch/bin/nightwatch";
	// Code to start browserstack local before start of test
	console.log("Connecting local");

	Nightwatch.bs_local = bs_local = new browserstack.Local();
	bs_local.start(
		{
			key: process.env.BROWSERSTACK_ACCESS_KEY,
			forceLocal: true,
			localIdentifier: "id",
		},
		function (error) {
			if (error) throw error;

			console.log("Connected. Now testing...", {
				key: process.env.BROWSERSTACK_ACCESS_KEY,
				forceLocal: true,
			});
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
