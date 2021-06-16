import axios from 'axios'

const state = {
    loginData: null,
    dataList: {
        formList: []
    },
    selectList:{
        characterList:[],
        ownedCharacterList:[]
    },
    api: {
        active: null,
        host: localStorage.getItem('HOST'),
        list:{
            getCharacterList: {
                baseURL: localStorage.getItem('HOST'),
                url: '/api/game/character',
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            },
            getMemberData: {
                baseURL: localStorage.getItem('HOST'),
                url: '/api/data/member',
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
    },
    validateMsg: {}
}

const getters = {
    itemsCount: (state) => {
        return state.dataList.items.length
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
    showAlert: (state) => {
        state.alert.dismissCountDown = state.alert.dismissSecs
    },
}

const actions = {
    getCharacterList: async (context) => {
        let params = {
            'enable': [1,2]
        }
        context.commit('getApiSetting',{which:'getCharacterList',params: params})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then(response => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data 
                }
                context.state.selectList.characterList = response.data.result
                console.log(context.state.selectList.characterList)

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
            alert('API設定失敗')
        }
    },
    getLoginData: async (context) => {
        if(localStorage.getItem('login_data') != undefined){
            context.state.loginData = JSON.parse(localStorage.getItem('login_data'))
        }else{
            window.location = '/login'
        }
    },
    getMemberData: async (context) => {
        let params = {
            'member_no': context.state.loginData.member_no
        }
        context.commit('getApiSetting',{which:'getMemberData',params: params})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then(response => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data 
                }
                if(response.data.result[0].member_character.length > 0){
                    response.data.result[0].member_character.forEach((el) => {
                        context.state.selectList.ownedCharacterList.push(el.character_no)
                    })
                }
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
            return []
        }
    },
    initPage: async (context) => {
        await context.dispatch('getLoginData')
        await context.dispatch('getCharacterList')
        await context.dispatch('getMemberData')
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