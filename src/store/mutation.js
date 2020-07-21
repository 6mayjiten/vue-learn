export const state = {
	count: 0,
	token: null,
	isLoggedIn: false
};

export const getters = {
	doneCount: (state) => {
		return state.count;
	}
};

export const mutations = {
	SET_INCREMENT: (state) => {
		state.count +=1
	},
	SET_DECREMENT: (state) => {
		state.count -= 1
	}
};
