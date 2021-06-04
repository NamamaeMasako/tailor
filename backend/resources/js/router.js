import Vue from 'vue';
import Router from 'vue-router';

// 引用頁面的 Component
import Login from './components/Auth/login.vue';
import Register from './components/Auth/register.vue';

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
import ManagerCreate from './components/Manager/create.vue';
import ManagerDetail from './components/Manager/detail.vue';

import UrlList from './components/Url/list.vue';
import UrlCreate from './components/Url/create.vue';
import UrlDetail from './components/Url/detail.vue';


// 使用 Vue Router
Vue.use(Router);

// Route 設定
export const routes = [
	{ path: '/login', component: Login, name:'login' },
	{ path: '/register', component: Register, name:'register' },

	{ path: '/member', redirect: '/member/list' },
	{ path: '/member/list', component: MemberList, name:'member-list'},
	{ path: '/member/create', component: MemberCreate, name:'member-create'},
	{ path: '/member/:member_no', component: MemberDetail, name:'member-detail'},
	
	{ path: '/game', redirect: '/game/character' },
	{ path: '/game/character', redirect: '/game/character/list' },
	{ path: '/game/job', redirect: '/game/job/list' },
	{ path: '/game/area', redirect: '/game/area/list' },
	{ path: '/game/stage', redirect: '/game/stage/list' },
	{ path: '/game/character/list', component: CharacterList, name:'character-list'},
	{ path: '/game/character/create', component: CharacterCreate, name:'character-create'},
	{ path: '/game/character/:character_no', component: CharacterDetail, name:'character-detail'},
	{ path: '/game/job/list', component: JobList, name:'job-list'},
	{ path: '/game/job/create', component: JobCreate, name:'job-create'},
	{ path: '/game/job/:job_no', component: JobDetail, name:'job-detail'},
	{ path: '/game/area/list', component: AreaList, name:'area-list'},
	{ path: '/game/area/create', component: AreaCreate, name:'area-create'},
	{ path: '/game/area/:area_no', component: AreaDetail, name:'area-detail'},
	{ path: '/game/stage/list', component: StageList, name:'stage-list'},
	{ path: '/game/stage/create', component: StageCreate, name:'stage-create'},
	{ path: '/game/stage/:stage_no', component: StageDetail, name:'stage-detail'},

	{ path: '/system', redirect: '/system/manager' },
	{ path: '/system/manager', redirect: '/system/manager/list' },
	{ path: '/system/url', redirect: '/system/url/list' },
	{ path: '/system/manager/list', component: ManagerList, name:'manager-list'},
	{ path: '/system/manager/create', component: ManagerCreate, name:'manager-create'},
	{ path: '/system/manager/:id', component: ManagerDetail, name:'manager-detail'},
	{ path: '/system/url/list', component: UrlList, name:'url-list'},
	{ path: '/system/url/create', component: UrlCreate, name:'url-create'},
	{ path: '/system/url/:id', component: UrlDetail, name:'url-detail'},

	{ path: '*', redirect: '/game' },
];

// 建立 Vue Router instance
const router = new Router({
	mode: 'history',
	routes
});

export default router;