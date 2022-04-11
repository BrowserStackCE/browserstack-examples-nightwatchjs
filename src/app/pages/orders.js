module.exports = {
	url: function () {
		return this.api.launchUrl + "/orders";
	},
	elements: {
		orders: ".shipment .a-fixed-right-grid > div",
	},
	commands: [
		{
			checkIfNOrdersPlaced: function (n) {
				return this.expect.elements("@orders").count.to.equal(n);
			},
		},
	],
};
