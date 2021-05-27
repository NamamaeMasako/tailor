import axios from "axios";
 
const state = {
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
                state.api.active = state.api.list[payload.which]
                if(state.api.active.method == 'post'){
                    state.api.active.data = state.dataList.formList
                }else if(state.api.active.method == 'get'){
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
        console.log(context.state.currentPath)
        console.log(context.getters.motherPath)
        context.commit('getApiSetting',{which:'getLinkList',params:{'mother_path': context.getters.motherPath}})
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
    initPage: async (context) => {
        await context.dispatch('getLinkList')
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