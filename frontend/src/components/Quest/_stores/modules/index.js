import axios from 'axios'
import moment from 'moment'

const state = {
    loginData: null,
    dataList: {
        formList: {
            character_no: null,
            stage_no: null
        },
        selectList: {
            areaList: [],
            ownedCharacterList: []
        }
    },
    modalStatus:{
        characterSelect: false
    },
    api: {
        active: null,
        host: localStorage.getItem('HOST'),
        list:{
            doQuest: {
                baseURL: localStorage.getItem('HOST'),
                url: '/api/data/member/updatestage',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            },
            getAreaList: {
                baseURL: localStorage.getItem('HOST'),
                url: '/api/game/area',
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
    showCountTime: (state) => {
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
    cancelQuest: async (context, payload) => {
        context.state.dataList.formList.character_no = payload.executor.character_no
        context.state.dataList.formList.stage_no = null
        await context.dispatch('doQuest')
    },
    doQuest: async (context) => {
        context.commit('getApiSetting',{which:'doQuest',paraArr:[context.state.loginData.member_no]})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then(response => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data 
                }
                context.state.modalStatus.characterSelect = false
                context.dispatch('getAreaList').then(context.dispatch('getMemberData'))
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
                context.state.modalStatus.characterSelect = false
            })
        }else{
            context.state.modalStatus.characterSelect = false
        }
    },
    getAreaList: async (context) => {
        context.commit('getApiSetting',{which:'getAreaList',params:{'enable': 1}})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then(response => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data 
                }
                context.state.dataList.selectList.areaList = response.data.result
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
                context.state.dataList.selectList.ownedCharacterList = response.data.result[0].member_character
                if(response.data.result[0].member_character.length > 0){
                    response.data.result[0].member_character.forEach((el) => {
                        if(el.stage_no != null){
                            context.state.dataList.selectList.areaList.forEach((area_el) => {
                                if(area_el.enable_stage.length > 0){
                                    area_el.enable_stage.forEach((stage_el) => {
                                        let timeArr = stage_el.time.split(':')
                                        stage_el.millisecond = parseInt(timeArr[0])*60*60*1000+parseInt(timeArr[1])*60*1000+parseInt(timeArr[2])*1000
                                        if(stage_el.stage_no == el.stage_no){
                                            stage_el.executor = {
                                                'character_no': el.character_no,
                                                'name': el.name,
                                                'goTimeValue': moment().valueOf()-moment(el.stage_start_time).valueOf()
                                            }
                                        }
                                    })
                                }
                            })
                        }
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
        await context.dispatch('getAreaList')
        await context.dispatch('getMemberData')
    },
    showCharacterSelectModal: (context, payload) => {
        context.state.modalStatus.characterSelect = !context.state.modalStatus.characterSelect
        context.state.dataList.formList.stage_no = payload
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