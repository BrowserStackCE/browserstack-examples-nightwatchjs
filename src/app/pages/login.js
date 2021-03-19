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
			login: function (username, password) {
				return this.clearValue("@usernameField")
					.setValue("@usernameField", username + "\n")
					.clearValue("@passwordField")
					.setValue("@passwordField", password)
					.click("#react-select-3-option-0-0")
					.click("#login-btn");
			},
		},
	],
};
