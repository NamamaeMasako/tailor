import axios from "axios";
 
const state = {
    loginData: {
        access_token: null
    },
    dataList:{
        formList: {}
    },
    currentPath: '',
    linkList: [],
    api: {
        active: null,
        host: localStorage.getItem('HOST'),
        list: {
            getLinkList: {
                baseURL: null,
                url: '/api/system/url',
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            },
            logout: {
                baseURL: null,
                url: '/api/logout',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            }
        }
    },
    alert: {
        variant: 'danger',
        message: '',
        dismissSecs: 5,
        dismissCountDown: 0,
        showDismissibleAlert: false
    }
}

const getters = {
    motherPath: (state) => {
        let pathArr = state.currentPath.split('/')
        if(pathArr.length > 1){
            return '/'+pathArr[1]
        }else{
            return null
        }
    }
}
 
const mutations = {
    getApiSetting: (state, payload) => {
        state.api.active = null
        if(typeof payload.which == 'string'){
            if(state.api.list[payload.which] != undefined || state.api.list[payload.which] != null){
                state.api.active = Object.assign({},state.api.list[payload.which])
                if(state.api.active.method == 'post'){
                    state.dataList.formList.access_token = state.loginData.access_token
                    state.api.active.data = state.dataList.formList
                }else if(state.api.active.method == 'get'){
                    if(payload.params == undefined){
                        payload.params = {}
                    }
                    payload.params.access_token = state.loginData.access_token
                    state.api.active.params = payload.params
                }
            }
        }
        if(Array.isArray(payload.paraArr)){
            payload.paraArr.forEach((el) => {
                state.api.active.url += '/'+el
            })
        }
    }
}

const actions = {
    getLinkList: async (context) => {
        context.commit('getApiSetting',{which:'getLinkList',params:{'mother_path':''}})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then(response => {
                if(response.data.status != true){
                    throw response.data 
                }
                context.state.linkList = response.data.result
            }).catch((error) => { 
                context.state.alert.variant = 'danger'
                context.state.alert.message = error['result']
            })
        }else{
            context.state.alert.variant = 'danger'
            context.state.alert.message = '無法取得清單'
        }
    },
    getLoginData: async (context) => {
        if(localStorage.getItem('login_data') != null){
            context.state.loginData = JSON.parse(localStorage.getItem('login_data'))
        }
    },
    initPage: async (context) => {
        await context.dispatch('getLoginData')
        await context.dispatch('getLinkList')
    },
    logout:async (context) => {
        context.state.dataList.formList = context.state.loginData
        context.commit('getApiSetting',{which:'logout'})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then(response => {
                if(response.data.status != true){
                    throw response.data 
                }
                localStorage.removeItem('login_data')
                window.location = '/login'
            }).catch((error) => { 
                context.state.alert.variant = 'danger'
                context.state.alert.message = error['result']
            })
        }else{
            context.state.alert.variant = 'danger'
            context.state.alert.message = '錯誤的API'
        }
    },
    updateSideMenu: async (context, path) => {
        context.state.currentPath = path
        context.rootState.sideMenuData.currentPath = path
        context.commit('getApiSetting',{which:'getLinkList',params:{'mother_path': context.getters.motherPath}})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then(response => {
                if(response.data.status != true){
                    throw response.data 
                }
                context.rootState.sideMenuData.linkList = response.data.result
            }).catch((error) => { 
                context.state.alert.variant = 'danger'
                context.state.alert.message = error['result']
            })
        }else{
            context.state.alert.variant = 'danger'
            context.state.alert.message = '無法取得清單'
        }
    }
}
 
const module = {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}
 
export default module