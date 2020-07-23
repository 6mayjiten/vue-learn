import Vue from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import { sync } from 'vuex-router-sync';
import store from './store';
import router from './route';
import './assets/sass/main.scss';

Vue.config.productionTip = false;
Vue.config.silent = true;

sync(store, router);

Vue.use(Antd);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#root');
