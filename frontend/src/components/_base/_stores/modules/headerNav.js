import axios from 'axios';
import moment from 'moment'

const state = {
    dataList: {
        loginData: {
            name: '',
            level: '',
            coins: '',
            experience: '',
            stamina: ''
        },
        formList: {
            access_token: '',
            email: ''
        },
        constantSetting: {
            list: {},
            inUsed: {
                experience: 0,
                staminaLimit: 0,
                wrarehouse: 0,
                resourceLimit: 0
            }
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
            getConstantList: {
                baseURL: localStorage.getItem('HOST'),
                url: '/api/data/constant',
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
    experienceBar: (state) => {
        return (state.dataList.loginData.experience/state.dataList.constantSetting.inUsed.experience)*100
    },
    resourceBar: (state, getters) => {
        return (getters.resourceTotalAmount/state.dataList.constantSetting.inUsed.resourceLimit)*100
    },
    resourceTotalAmount: (state) => {
        let targerArr = ['bug', 'feather', 'cannabis', 'gem']
        let result = 0
        Object.keys(state.dataList.loginData).forEach((el) => {
            if(targerArr.indexOf(el) > -1){
                result += state.dataList.loginData[el]
            }
        })
        return result
    },
    stamina: (state) => {
        
        return moment().diff(moment(state.dataList.loginData.stamina_updated_at))
    },
    staminaBar: (state) => {
        return (state.dataList.loginData.stamina/state.dataList.constantSetting.inUsed.staminaLimit)*100
    },
    warehouseBar: (state) => {
        return (state.dataList.loginData.costume_totalAmount/state.dataList.constantSetting.inUsed.warehouse)*100
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
                    state.api.active.data = state.dataList.formList
                }else if(state.api.active.method == 'get'){
                    if(payload.params == undefined){
                        payload.params = {}
                    }
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
    getLoginData: (state) => {
        if(localStorage.getItem('login_data') != null){
            state.dataList.formList = JSON.parse(localStorage.getItem('login_data'))
        }else{
            window.location = '/login'
        }
    },
    setConstants: (state) => {
        let levelRangeArr = []
        state.dataList.constantSetting.list.experience.forEach((el) => {
            let lavelRange = el.text.split('|')
            levelRangeArr.push(lavelRange)
        })
        levelRangeArr.forEach((el,i) => {
            if(state.dataList.loginData.level >= el[0] && state.dataList.loginData.level <= el[1]){
                state.dataList.constantSetting.inUsed.experience = state.dataList.constantSetting.list.experience[i].usage
            }
        })
        state.dataList.constantSetting.inUsed.staminaLimit = parseInt(state.dataList.constantSetting.list.staminalimit[0].text) + parseInt(state.dataList.loginData.level) * parseInt(state.dataList.constantSetting.list.staminalimit[0].usage)
        state.dataList.constantSetting.inUsed.warehouse = parseInt(state.dataList.constantSetting.list.warehouse[0].usage)
        state.dataList.constantSetting.inUsed.resourceLimit = parseInt(state.dataList.constantSetting.list.resourcelimit[0].usage)
    },
    showAlert: (state) => {
        state.alert.dismissCountDown = state.alert.dismissSecs
    },
}

const actions = {
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
        }else{
            context.state.alert.message = '錯誤的API'
            context.commit('showAlert')
        }
    },
    getConstantList: async (context) => {
        let params = {
            'access_token': context.state.dataList.formList.access_token,
            'page': 'member'
        }
        context.commit('getApiSetting',{which:'getConstantList',params: params})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then(response => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data 
                }
                context.state.dataList.constantSetting.list = response.data.result.member
                setTimeout(()=>{
                    context.commit('setConstants')
                    context.dispatch('staminaRecover')
                },200)
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
        context.commit('getLoginData')
        await context.dispatch('getMemberData')
        await context.dispatch('getConstantList')
    },
    staminaRecover: async (context) => {
        setTimeout(async () => {
            if(context.state.dataList.loginData.stamina < context.state.dataList.constantSetting.inUsed.staminaLimit){
                context.state.dataList.loginData.stamina += 1
                await context.dispatch('staminaRecover')
            }
        },144000)
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