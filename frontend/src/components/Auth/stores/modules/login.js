import axios from 'axios';

const state = {
    loginData: null,
    dataList: {
        formList: {
            email: '',
            password: ''
        }
    },
    api: {
        active: null,
        host: localStorage.getItem('HOST'),
        list:{
            submit: {
                baseURL: localStorage.getItem('HOST'),
                url: '/api/login',
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
        email: '',
        password: ''
    }
}

const getters = {

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
                    state.api.active.data = state.dataList.formList
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
    checkLogin: async (context) => {
        if(context.state.loginData != null){
            context.state.dataList.formList.email = context.state.loginData.email
            context.state.dataList.formList.access_token = context.state.loginData.access_token
            await context.dispatch('submit')
        }
    },
    getLoginData: async (context) => {
        if(localStorage.getItem('login_data') != null){
            context.state.loginData = JSON.parse(localStorage.getItem('login_data'))
        }
    },
    submit: async (context) => {
        context.commit('getApiSetting',{which:'submit'})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then((response) => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data
                }
                localStorage.setItem('login_data', JSON.stringify(response.data['result']));
                context.state.alert.variant = 'success'
                context.state.alert.message = '登入成功'
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
        await context.dispatch('checkLogin')
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