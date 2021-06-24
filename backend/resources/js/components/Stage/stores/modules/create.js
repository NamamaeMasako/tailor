const state = {
    loginData: {
        access_token: null
    },
    dataList: {
        showHour: '',
        showMinute: '',
        showSecond: '',
        formList: {
            title: '',
            order: '',
            time: '',
            bug_value: '0',
            feather_value: '0',
            cannabis_value: '0',
            gem_value: '0',
            coins: '0'
        },
        selectList: {
            resource: []
        }
    },
    api: {
        active: null,
        host: localStorage.getItem('HOST'),
        list: {
            getResourceList: {
                baseURL: null,
                url: '/api/data/constant',
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            },
            submit: {
                baseURL: null,
                url: '/api/game/stage',
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
        title: '',
        order: ''
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
    },
    showAlert(state, payload) {
        state.alert.dismissCountDown = state.alert.dismissSecs
    },
}

const actions = {
    getLoginData: async (context) => {
        if(localStorage.getItem('login_data') != undefined){
            context.state.loginData = JSON.parse(localStorage.getItem('login_data'))
        }else{
            window.location = '/login'
        }
    },
    getResourceList: async (context) => {
        context.commit('getApiSetting',{which:'getResourceList',params:{'page': 'stage','function': 'resource'}})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then((response) => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data
                }
                context.state.dataList.selectList.resource = response.data['result'].stage.resource
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
    submit: async (context) => {
        let hour = context.state.dataList.showHour
        let minute = context.state.dataList.showMinute
        let second = context.state.dataList.showSecond
        if(hour < 10){
            hour = '0'+hour
        }
        if(minute < 10){
            minute = '0'+minute
        }
        if(second < 10){
            second = '0'+second
        }
        context.state.dataList.formList.time = hour+':'+minute+':'+second
        if(context.state.dataList.formList.order > 0){
            context.state.dataList.formList.order -= 1
        }
        context.commit('getApiSetting',{which:'submit'})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then((response) => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data
                }
                context.state.alert.variant = 'success'
                context.state.alert.message = response.data['result']
                context.commit('showAlert')
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
        await context.dispatch('getResourceList')
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