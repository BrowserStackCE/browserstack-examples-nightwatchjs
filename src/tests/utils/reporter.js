let allure = require("allure-commandline");

module.exports = {
	write: function (results, done) {
		console.log(results);
		let srcResult = __dirname + "/../../../results";
		let generate = allure(["generate", "--clean", srcResult]);
		generate.on("error", () => {
			if (done !== undefined) {
				done();
			}
		});
	},
};
