import axios from 'axios';
const url = process.env.VUE_APP_REST_BASE_URL;

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
					resolve(null);
					commit('SET_LOGIN', data.message);
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

	logout: ({ commit }) => {
		commit('SET_LOADER', true);
		return new Promise((resolve) => {
			setTimeout(() => {
				commit('SET_LOADER', false);
				commit('SET_LOGOUT');
				resolve();
			}, 2000);
		});
	},

};
