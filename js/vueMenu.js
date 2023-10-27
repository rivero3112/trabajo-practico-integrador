const { createApp } = Vue;

const menuApp = createApp({
	data() {
		return {
			menuClass: "menuHidden",
			dolarPrice: 0,
			monthCards: [
				{
					count: 3,
					unit: "meses",
					unitPrice: 1,
				},
				{
					count: 6,
					unit: "meses",
					unitPrice: 1,
				},
				{
					count: 1,
					unit: "año",
					unitPrice: 1,
				}
			]
		};
	},
	created() {
		fetch("https://dolarapi.com/v1/dolares/blue")
			.then((response) => response.json())
			.then((data) => {
				this.dolarPrice = data.venta;
			});
	},
	methods: {
		showMenu() {
			this.menuClass = "menuShow";
		},
		closeMenu() {
			this.menuClass = "menuHidden";
		},
		fetchDollar() {
			fetch("https://dolarapi.com/v1/dolares/blue")
				.then((response) => response.json())
				.then((data) => {
					this.dolarPrice = data.venta;
				});
		},
	},
});

menuApp.mount("#app");
