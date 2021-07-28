import Vue from 'vue'
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
            ownedCharacterList: [],
            finishedQuestList: [],
            getResourceList: {}
        }
    },
    modalStatus:{
        characterSelect: false,
        finishedQuest: false
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

}
 
const mutations = {
    closeFinishedQuestModal: (state) => {
        console.log(state.dataList.selectList.finishedQuestList)
        state.dataList.selectList.finishedQuestList.forEach((el) => {
            state.dataList.selectList.areaList.forEach((area_el) => {
                if(area_el.enable_stage.length > 0){
                    area_el.enable_stage.forEach((stage_el) => {
                        if(stage_el.stage_no == el.stage_no){
                            delete stage_el.executor
                        }
                    })
                }
            })
        })
        state.modalStatus.finishedQuest = false
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
    getLoginData: (state) => {
        if(localStorage.getItem('login_data') != null){
            state.loginData = JSON.parse(localStorage.getItem('login_data'))
        }else{
            window.location = '/login'
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
        context.state.dataList.selectList.getResourceList = {}
        context.commit('getApiSetting',{which:'doQuest',paraArr:[context.state.loginData.member_no]})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then(async response => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data 
                }
                context.state.modalStatus.characterSelect = false
                if(response.data.result != null){
                    context.state.dataList.selectList.getResourceList = response.data.result
                }
                await context.dispatch('getMemberData')
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
                context.state.dataList.selectList.areaList = Object.values(response.data.result)
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
                localStorage.setItem('login_data', JSON.stringify(response.data.result[0]));
                context.commit('getLoginData')
                context.state.dataList.selectList.ownedCharacterList = response.data.result[0].member_character
                if(response.data.result[0].member_character.length > 0){
                    response.data.result[0].member_character.forEach((el) => {
                        if(el.stage_no != null){
                            context.state.dataList.selectList.areaList.forEach((area_el) => {
                                if(area_el.enable_stage.length > 0){
                                    area_el.enable_stage.forEach((stage_el) => {
                                        stage_el.millisecond = moment.duration(stage_el.time, 'ms')._milliseconds
                                        if(stage_el.stage_no == el.stage_no){
                                            stage_el.executor = {
                                                'character_no': el.character_no,
                                                'name': el.name,
                                                'goTimeValue': moment().diff(moment(el.stage_start_time))
                                            }
                                            if(stage_el.executor.goTimeValue < stage_el.millisecond){
                                                context.dispatch('setCountDown',{ 'area_no': area_el.area_no, 'stage_no': stage_el.stage_no })
                                            }else{
                                                context.state.dataList.selectList.finishedQuestList.push(stage_el)
                                                context.state.modalStatus.finishedQuest = true
                                                context.dispatch('cancelQuest',stage_el)
                                            }
                                        }
                                    })
                                    if(context.state.dataList.selectList.finishedQuestList.length > 0){
                                        context.state.dataList.selectList.finishedQuestList.forEach((quest_el) => {
                                            quest_el.getResource = []
                                            if(context.state.dataList.selectList.getResourceList[quest_el.stage_no] != undefined){
                                                quest_el.getResource = context.state.dataList.selectList.getResourceList[quest_el.stage_no]
                                            }
                                        })
                                    }
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
        }
    },
    initPage: async (context) => {
        context.commit('getLoginData')
        await context.dispatch('getAreaList')
        await context.dispatch('getMemberData')
    },
    setCountDown: async (context, payload) => {
        context.state.dataList.selectList.areaList.forEach((el,i) => {
            if(el.area_no == payload.area_no && el.enable_stage.length > 0){
                el.enable_stage.forEach((stage_el) => {
                    if(stage_el.stage_no == payload.stage_no && (stage_el.executor != null || stage_el.executor != undefined)){
                        stage_el.executor.goTimeValue += 1000
                        Vue.set(context.state.dataList.selectList.areaList, i, el);
                        if(stage_el.executor.goTimeValue < stage_el.millisecond){
                            setTimeout(async () => {
                                await context.dispatch('setCountDown',payload)
                            },1000)
                        }else{
                            context.state.dataList.selectList.finishedQuestList.push(stage_el)
                            context.state.modalStatus.finishedQuest = true
                            context.dispatch('cancelQuest',stage_el)
                        }
                    }
                })
            }
        })
    },
    showCharacterSelectModal: async (context, payload) => {
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