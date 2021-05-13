import Vue from 'vue';
import Router from 'vue-router';

// 引用頁面的 Component
import Example from './components/ExampleComponent.vue';
import Character from './components/Character/list.vue';

// 使用 Vue Router
Vue.use(Router);

// Route 設定
export const routes = [
	{ path: '/example', component: Example, name:'Example'},
	{ path: '/character', redirect: '/character/list' },
	{ path: '/character/list', component: Character, name:'Character'},
	// { path: '*', redirect: '/' },
];

// 建立 Vue Router instance
const router = new Router({
	mode: 'history',
	routes
});

export default router;