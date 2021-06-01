import Vue from 'vue';
import Router from 'vue-router';

// 引用頁面的 Component
import CharacterList from './components/Character/list.vue';
import CharacterCreate from './components/Character/create.vue';
import CharacterDetail from './components/Character/detail.vue';

import JobList from './components/Job/list.vue';
import JobCreate from './components/Job/create.vue';
import JobDetail from './components/Job/detail.vue';

import MemberList from './components/Member/list.vue';
import MemberCreate from './components/Member/create.vue';
import MemberDetail from './components/Member/detail.vue';

import AreaList from './components/Area/list.vue';
import AreaCreate from './components/Area/create.vue';
import AreaDetail from './components/Area/detail.vue';

import StageList from './components/Stage/list.vue';
import StageCreate from './components/Stage/create.vue';
import StageDetail from './components/Stage/detail.vue';

import ManagerList from './components/Manager/list.vue';

import UrlList from './components/Url/list.vue';
import UrlCreate from './components/Url/create.vue';
import UrlDetail from './components/Url/detail.vue';


// 使用 Vue Router
Vue.use(Router);

// Route 設定
export const routes = [
	{ path: '/member', redirect: '/member/list' },
	{ path: '/member/list', component: MemberList, name:'Member-list'},
	{ path: '/member/create', component: MemberCreate, name:'Member-create'},
	{ path: '/member/:member_no', component: MemberDetail, name:'Member-detail'},
	
	{ path: '/game', redirect: '/game/character/list' },
	{ path: '/game/character/list', component: CharacterList, name:'Character-list'},
	{ path: '/game/character/create', component: CharacterCreate, name:'Character-create'},
	{ path: '/game/character/:character_no', component: CharacterDetail, name:'Character-detail'},
	{ path: '/game/job/list', component: JobList, name:'Job-list'},
	{ path: '/game/job/create', component: JobCreate, name:'Job-create'},
	{ path: '/game/job/:job_no', component: JobDetail, name:'job-detail'},
	{ path: '/game/area/list', component: AreaList, name:'Area-list'},
	{ path: '/game/area/create', component: AreaCreate, name:'Area-create'},
	{ path: '/game/area/:area_no', component: AreaDetail, name:'Area-detail'},
	{ path: '/game/stage/list', component: StageList, name:'Stage-list'},
	{ path: '/game/stage/create', component: StageCreate, name:'Stage-create'},
	{ path: '/game/stage/:stage_no', component: StageDetail, name:'Stage-detail'},

	{ path: '/system', redirect: '/system/manager/list' },
	{ path: '/system/manager/list', component: ManagerList, name:'Manager-list'},
	{ path: '/system/url/list', component: UrlList, name:'Url-list'},
	{ path: '/system/url/create', component: UrlCreate, name:'Url-create'},
	{ path: '/system/url/:id', component: UrlDetail, name:'Url-detail'},

	// { path: '*', redirect: '/' },
];

// 建立 Vue Router instance
const router = new Router({
	mode: 'history',
	routes
});

export default router;