export const state = {
	isLoading: false,
	isSpinning: false,
	token: null,
	isLoggedIn: false,
	cart: [],
};

export const getters = {

};

export const mutations = {
	SET_LOADER: (state, payload) => {
		state.isLoading = payload;
	},
	SET_SPINNER: (state, payload) => {
		state.isSpinning = payload;
	},
	SET_LOGIN: (state, payload) => {
		state.token = payload.token,
		state.isLoggedIn = payload.auth
	},
	SET_LOGOUT: (state) => {
		state.token = null,
		state.isLoggedIn = false
	},
};
