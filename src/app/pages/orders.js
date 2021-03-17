module.exports = {
	url: "https://bstackdemo.com/orders",
	elements: {
		orders: ".a-fixed-right-grid-inner.a-grid-vertical-align.a-grid-top",
	},
	commands: [
		{
			checkIfNOrdersPlaced: function (n) {
				this.assert.urlEquals(this.url);
				return this.expect.elements("@orders").count.to.equal(n);
			},
		},
	],
};
