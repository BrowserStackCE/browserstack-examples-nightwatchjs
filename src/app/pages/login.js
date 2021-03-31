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
					.setValue("@usernameField", username)
					.click(userData[username].selector)
					.clearValue("@passwordField")
					.setValue("@passwordField", userData[username].password)
					.click(userData[userData[username].password].selector)
					.click("#login-btn");
			},
		},
	],
};
