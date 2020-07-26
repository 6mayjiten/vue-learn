const getDefaultState = () => {
	return {
		isLoading: false,
		isSpinning: false,
		token: null,
		isLoggedIn: false,
		cart: [],
		user: {},
		orders: [],
		addresses: [],
	}
};

export const state = getDefaultState();

export const getters = {
	getToken(state){
		return state.token;
	}
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
		state.isLoggedIn = payload.auth,
		state.user = payload.user
	},
	SET_USER: (state, payload) => {
		state.user = payload.user
	},
	SET_USER_ADDRESS: (state, payload) => {
		state.addresses = payload.address
	},
	SET_LOGOUT: (state) => {
		Object.assign(state, getDefaultState());
	},
};
