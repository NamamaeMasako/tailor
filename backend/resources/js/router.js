import Vue from 'vue';
import Router from 'vue-router';

// 引用頁面的 Component
import CharacterList from './components/Character/list.vue';
import CharacterCreate from './components/Character/create.vue';
import CharacterDetail from './components/Character/detail.vue';

import JobList from './components/Job/list.vue';
import JobCreate from './components/Job/create.vue';
import JobDetail from './components/Job/detail.vue';

import SystemList from './components/System/list.vue';

import UrlList from './components/Url/list.vue';


// 使用 Vue Router
Vue.use(Router);

// Route 設定
export const routes = [
	{ path: '/character', redirect: '/character/list' },
	{ path: '/character/list', component: CharacterList, name:'Character-list'},
	{ path: '/character/create', component: CharacterCreate, name:'Character-create'},
	{ path: '/character/:character_no', component: CharacterDetail, name:'Character-detail'},
	{ path: '/character/job/list', component: JobList, name:'Job-list'},
	{ path: '/character/job/create', component: JobCreate, name:'Job-create'},
	{ path: '/character/job/:job_no', component: JobDetail, name:'job-detail'},

	{ path: '/system', redirect: '/system/list' },
	{ path: '/system/list', component: SystemList, name:'System-list'},
	{ path: '/system/url/list', component: UrlList, name:'Url-list'},


	// { path: '*', redirect: '/' },
];

// 建立 Vue Router instance
const router = new Router({
	mode: 'history',
	routes
});

export default router;