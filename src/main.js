import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync';
import store from './store';
import router from './route';
import './assets/sass/main.scss';

sync(store, router);
Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#root');
