module.exports = {
	src_folders: ["src/tests/suites"],
	output_folder: "results",

	page_objects_path: "src/app/pages/",

	test_settings: {
		test_runner: {
			type: "mocha",
			parallel: true,
			jobs: 10,
			timeout: 9000000,
		},

		default: {
			launch_url: "https://bstackdemo.com",
		},
	},
};
