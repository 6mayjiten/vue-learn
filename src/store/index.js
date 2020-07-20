import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const state = {
    count: 0,
};

const getters = {
};

const actions = {
    increment: ({ commit }) => commit('SET_INCREMENT'),
    decrement: ({ commit }) => commit('SET_DECREMENT'),
};

const mutations = {
    SET_INCREMENT: (state) => {
        state.count += 1;
    },
    SET_DECREMENT: (state) => {
        state.count -= 1;
    }
};

const store =  new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    plugins: [createPersistedState()]
});

export default store;
