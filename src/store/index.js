import Vue from 'vue';
import Vuex from 'vuex';
import {actions} from './action';
import {mutations, state, getters} from './mutation';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store =  new Vuex.Store({
	state,
	actions,
	mutations,
	getters,
	plugins: [createPersistedState()]
});

export default store;
