const { createApp } = Vue;

const menuApp = createApp({
	data() {
		return {
			menuClass: `menuHidden`,
			dolarPrice: 0,
			monthCards: [
				{
					count: 3,
					unit: "meses",
					unitPrice: 2,
				},
				{
					count: 6,
					unit: "meses",
					unitPrice: 1.5,
				},
				{
					count: 12,
					unit: "meses",
					unitPrice: 1,
				},
			],
			registerForm: false, //show-signup
			pwShowHide: "password", //password
			formEyeIcon: "bx-hide", //"bx-show"
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
		changePWHide() {
			this.pwShowHide == "text"
				? (this.pwShowHide = "password")
				: (this.pwShowHide = "text");
			this.formEyeIcon == "bx-show" ? (this.formEyeIcon = "bx-hide") : (this.formEyeIcon = "bx-show");
		},
		changeRegisterForm(value) {
			this.registerForm = value;
		}
	},
});

menuApp.mount("#app");
