const { createApp } = Vue;

const menuApp = createApp({
	data() {
		return {
			menuClass: "menuHidden",
		};
	},
	methods: {
		showMenu() {
			this.menuClass = "menuShow";
		},
		closeMenu() {
			this.menuClass = "menuHidden";
		},
	},
});

menuApp.mount("#app");
