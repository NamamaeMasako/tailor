import Vue from 'vue'

//support vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//引用設定好的vue router
import router from './router.js';

// axios
import axios from 'axios';
Vue.prototype.$axios = axios;

//bootstrap vue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

//use bootstrap
import 'bootstrap';

import App from './App.vue'

Vue.config.productionTip = false

import './assets/css/app.css';

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
