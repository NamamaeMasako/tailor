import Vue from 'vue';
import Router from 'vue-router';

// 引用頁面的 Component
import Login from './components/Auth/login.vue';
import Register from './components/Auth/register.vue';

import Home from './components/Home/index.vue';
import Quest from './components/Quest/index.vue';

// 使用 Vue Router
Vue.use(Router);

// Route 設定
export const routes = [
	{ path: '/', redirect: '/home' },
	{ path: '/home', component: Home, name:'home' },
	{ path: '/quest', component: Quest, name:'quest' },

	{ path: '/login', component: Login, name:'login' },
	{ path: '/register', component: Register, name:'register' },

	{ path: '*', redirect: '/' },
];

// 建立 Vue Router instance
const router = new Router({
	mode: 'history',
	routes
});

export default router;