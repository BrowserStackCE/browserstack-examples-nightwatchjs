const userData = require("../../../resources/data/users.json");

module.exports = {
	url: function () {
		return this.api.launchUrl + "/signin";
	},
	elements: {
		usernameField: { selector: "#username input" },
		passwordField: { selector: "#password input" },
	},
	commands: [
		{
			login: function (username) {
				return this.clearValue("@usernameField")
					.setValue("@usernameField", username + this.api.Keys.ENTER)
					.clearValue("@passwordField")
					.setValue(
						"@passwordField",
						userData[username].password + this.api.Keys.ENTER
					)
					.click("#login-btn");
			},
		},
	],
};
