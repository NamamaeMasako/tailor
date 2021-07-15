import axios from 'axios';

const state = {
    dataList: {
        loginData: {
            name: '',
            levle: '',
            coins: '',
            experience: '',
            stamina: ''
        },
        formList: {
            access_token: '',
            email: ''
        }
    },
    api: {
        active: null,
        host: localStorage.getItem('HOST'),
        list:{
            getMemberData: {
                baseURL: localStorage.getItem('HOST'),
                url: '/api/data/member',
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            },
            logout: {
                baseURL: localStorage.getItem('HOST'),
                url: '/api/member/logout',
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
    },
    validateMsg: {
        email: ''
    }
}

const getters = {
    resourceTotalAmount: (state) => {
        let targerArr = ['bug', 'feather', 'cannabis', 'gem']
        let result = 0
        Object.keys(state.dataList.loginData).forEach((el) => {
            if(targerArr.indexOf(el) > -1){
                result += state.dataList.loginData[el]
            }
        })
        return result
    }
}
 
const mutations = {
    countDownChanged: (state, payload) => {
        state.alert.dismissCountDown = payload
    },
    getApiSetting: (state, payload) => {
        state.api.active = null
        if(typeof payload.which == 'string'){
            if(state.api.list[payload.which] != undefined || state.api.list[payload.which] != null){
                state.api.active = Object.assign({},state.api.list[payload.which])
                if(state.api.active.method == 'post'){
                    // state.dataList.formList.access_token = state.loginData.access_token
                    state.api.active.data = state.dataList.formList
                }else if(state.api.active.method == 'get'){
                    if(payload.params == undefined){
                        payload.params = {}
                    }
                    // payload.params.access_token = state.loginData.access_token
                    state.api.active.params = payload.params
                }
            }
        }
        if(Array.isArray(payload.paraArr)){
            payload.paraArr.forEach((el) => {
                state.api.active.url += '/'+el
            })
        }
    },
    showAlert(state) {
        state.alert.dismissCountDown = state.alert.dismissSecs
    },
}

const actions = {
    getLoginData: async (context) => {
        if(localStorage.getItem('login_data') != null){
            context.state.dataList.formList = JSON.parse(localStorage.getItem('login_data'))
            await context.dispatch('getMemberData')
        }else{
            window.location = '/login'
        }
    },
    getMemberData: async (context) => {
        let params = {
            'access_token': context.state.dataList.formList.access_token,
            'member_no': context.state.dataList.formList.member_no
        }
        context.commit('getApiSetting',{which:'getMemberData',params: params})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then(response => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data 
                }
                context.state.dataList.loginData = Object.values(response.data.result)[0]
            }).catch((error) => { 
                context.state.alert.variant = 'danger'
                context.state.alert.message = error['result']
                Object.keys(context.state.validateMsg).map((key) => {
                    if(error['message'][key] != undefined){
                        context.state.validateMsg[key] = error['message'][key]
                    }else{
                        context.state.validateMsg[key] = ''
                    }
                })
                context.commit('showAlert')
            })
        }
    },
    logout: async (context) => {
        context.commit('getApiSetting',{which:'logout'})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then((response) => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data
                }
                localStorage.removeItem('login_data');
                context.state.alert.variant = 'success'
                context.state.alert.message = '登出成功'
                context.commit('showAlert')
                setTimeout(()=>{
                    window.location = '/'
                },context.state.alert.dismissSecs*1000)
            }).catch((error) => { 
                context.state.alert.variant = 'danger'
                context.state.alert.message = error['result']
                Object.keys(context.state.validateMsg).map((key) => {
                    if(error['message'][key] != undefined){
                        context.state.validateMsg[key] = error['message'][key]
                    }else{
                        context.state.validateMsg[key] = ''
                    }
                })
                context.commit('showAlert')
            })
        }else{
            context.state.alert.message = '錯誤的API'
            context.commit('showAlert')
        }
    },
    initPage: async (context) => {
        await context.dispatch('getLoginData')
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