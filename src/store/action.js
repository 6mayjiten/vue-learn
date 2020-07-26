import axios from 'axios';
const url = process.env.VUE_APP_REST_BASE_URL;
const headers = {'Content-Type': 'application/json' };

export const actions = {
	signup: ({ commit }, data) => {
		commit('SET_SPINNER', true);
		return new Promise((resolve, reject) => {
			axios.post(`${url}/user`, data).then((res) => {
				const data = res.data;
				if (data.error) {
					reject(data.message);
				}else{
					resolve(data.message);
				}
			}).catch(() => {
				reject('Something went wrong');
			}).finally(() => {
				setTimeout(()=>{
					commit('SET_SPINNER', false);
				}, 1000)
			});
		});
	},

	login: async ({ commit }, data) => {
		commit('SET_SPINNER', true);
		return new Promise((resolve, reject) => {
			axios.post(`${url}/login`, data).then((res) => {
				const data = res.data;
				if (data.error) {
					return reject(data.message);
				}else {
					commit('SET_LOGIN', data.message);
					resolve(null);
				}
			}).catch(() => {
				reject('Something went wrong');
			}).finally(()=>{
				setTimeout(()=>{
					commit('SET_SPINNER', false);
				}, 1000)
			});
		});
	},

	forgetPassword: ({ commit }, data) => {
		commit('SET_SPINNER', true);
		setTimeout(()=>{
			console.log(data);
			commit('SET_SPINNER', false);
		}, 1000)
	},

	updateUserProfile: ({ commit, getters }, data) => {
		commit('SET_SPINNER', true);
		headers['x-access-token'] = getters.getToken;
		return new Promise((resolve, reject) => {
			axios.post(`${url}/user/update`, data,{headers})
				.then(res => {
					const data = res.data;
					if (data.error) {
						return reject(data.message);
					}else {
						commit('SET_USER', data.message);
						resolve(null);
					}
				})
				.catch(() => {
					reject('Something went wrong');
				})
				.finally(()=>{
					setTimeout(()=>{
						commit('SET_SPINNER', false);
					}, 1000)
				});
		})
	},

	addAddress: ( { commit, getters }, data) => {
		commit('SET_SPINNER', true);
		headers['x-access-token'] = getters.getToken;
		return new Promise((resolve, reject) => {
			axios.post(`${url}/user/address`, {address: data },{headers})
				.then(res => {
					const data = res.data;
					if (data.error) {
						return reject(data.message);
					}else {
						commit('SET_ADDRESS', data.message);
						resolve(null);
					}
				})
				.catch(() => {
					reject('Something went wrong');
				})
				.finally(()=>{
					setTimeout(()=>{
						commit('SET_SPINNER', false);
					}, 1000)
				});
		})
	},

	logout: ({ commit }) => {
		commit('SET_LOADER', true);
		return new Promise((resolve) => {
			setTimeout(() => {
				commit('SET_LOADER', false);
				commit('SET_LOGOUT');
				resolve(null);
			}, 2000);
		});
	},

};
