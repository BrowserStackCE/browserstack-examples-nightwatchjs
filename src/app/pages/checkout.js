module.exports = {
	url: "https://bstackdemo.com/checkout",
	elements: {
		firstNameInput: "#firstNameInput",
		lastNameInput: "#lastNameInput",
		addressInput: "#addressLine1Input",
		provinceInput: "#provinceInput",
		zipcodeInput: "#postCodeInput",
		submitButton: "#checkout-shipping-continue",
	},
	commands: [
		{
			enterDetailAndSubmit: function (
				firstName,
				lastName,
				address,
				province,
				zipcode
			) {
				this.assert.urlEquals(this.url);
				return this.clearValue("@firstNameInput")
					.setValue("@firstNameInput", firstName)
					.clearValue("@lastNameInput")
					.setValue("@lastNameInput", lastName)
					.clearValue("@addressInput")
					.setValue("@addressInput", address)
					.clearValue("@provinceInput")
					.setValue("@provinceInput", province)
					.clearValue("@zipcodeInput")
					.setValue("@zipcodeInput", zipcode)
					.click("@submitButton");
			},
		},
	],
};
