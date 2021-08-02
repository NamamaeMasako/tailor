import axios from 'axios'
import moment from 'moment'

const state = {
    workStatus: false,
    workCountDown: null,
    workTitle: null,
    loginData: null,
    dataList: {
        memberData: null,
        fields: [
            { key: 'title', label: '服裝', sortable: false },
            { key: 'gender_text', label: '性別', sortable: false },
            { key: 'part_text', label: '部位', sortable: false },
            { key: 'amount', label: '庫存', sortable: false },
            { key: 'costume_no', label: '', sortable: false },
        ],
        formList:{
            count: 1
        },
        modalData: {
            bug: 0,
            feather: 0,
            cannabis: 0,
            gem: 0,
            amount: 1
        },
        selectList:{
            costumeList:[]
        },
        perPage: 10,
        currentPage: 1
    },
    api: {
        active: null,
        host: localStorage.getItem('HOST'),
        list:{
            getCostumeData: {
                baseURL: localStorage.getItem('HOST'),
                url: '/api/game/costume',
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
            },
            submit: {
                baseURL: localStorage.getItem('HOST'),
                url: '/api/data/member/dowork',
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
    validateMsg: {},
    modalStatus:{
        error: false,
        getCostume: false
    }
}

const getters = {
    amountCheck: (state) => {
        let modalData = state.dataList.modalData
        let memberData = state.dataList.memberData
        if(modalData.bug > memberData.bug || modalData.feather > memberData.feather || modalData.cannabis > memberData.cannabis || modalData.gem > memberData.gem || modalData.stamina > memberData.stamina){
            return false
        }else{
            return true
        }
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
    getCostumeData: (state, payload) => {
        let formList = {
            costume_no: null,
            count: 0
        }
        if(payload != null){        
            state.dataList.modalData = {
                origin: payload,
                bug: payload.bug,
                feather: payload.feather,
                cannabis: payload.cannabis,
                gem: payload.gem,
                stamina: payload.stamina,
                quantity: payload.quantity,
                amount: payload.quantity,
                time: payload.time
            }
            formList.costume_no = payload.costume_no
            formList.count = 1
            state.modalStatus.getCostume = true
        }
        state.dataList.formList = formList
    },
    getWorkTitle: (state) => {
        state.workTitle = null
        if(state.dataList.memberData.costume_no != null){
            state.dataList.memberData.member_costume.forEach((el) => {
                if(el.costume_no == state.dataList.memberData.costume_no){
                    state.workTitle = el.title
                }
            })
        }
    },
    showAlert: (state) => {
        state.alert.dismissCountDown = state.alert.dismissSecs
    },
    updateCost: (state) => {
        state.dataList.modalData.bug = parseInt(state.dataList.modalData.origin.bug)*parseInt(state.dataList.formList.count)
        state.dataList.modalData.feather = parseInt(state.dataList.modalData.origin.feather)*parseInt(state.dataList.formList.count)
        state.dataList.modalData.cannabis = parseInt(state.dataList.modalData.origin.cannabis)*parseInt(state.dataList.formList.count)
        state.dataList.modalData.gem = parseInt(state.dataList.modalData.origin.gem)*parseInt(state.dataList.formList.count)
        state.dataList.modalData.stamina = parseInt(state.dataList.modalData.origin.stamina)*parseInt(state.dataList.formList.count)
        state.dataList.modalData.amount = parseInt(state.dataList.modalData.origin.quantity)*parseInt(state.dataList.formList.count)
        let time = moment.duration(state.dataList.modalData.origin.time)*parseInt(state.dataList.formList.count)
        let h = moment.duration(time).get('h')
        if(h<10){
            h = '0'+h
        }
        let m = moment.duration(time).get('m')
        if(m<10){
            m = '0'+m
        }
        let s = moment.duration(time).get('s')
        if(s<10){
            s = '0'+s
        }
        state.dataList.modalData.time = h+':'+m+':'+s
    }
}

const actions = {
    checkWorkStatus: async (context) => {
        if(moment(context.state.dataList.memberData.work_finished_at) <= moment()){
            if(context.state.workStatus != false){
                context.commit('getCostumeData',null)
                await context.dispatch('submit')
            }
            context.state.workStatus = false
        }else{
            setTimeout(() => {
                let duration = moment.duration(moment(context.state.dataList.memberData.work_finished_at).diff(moment()))
                let h = duration.hours();
                if(h<10){
                    h = '0'+h
                }
                let m = duration.minutes();
                if(m<10){
                    m = '0'+m
                }
                let s = duration.seconds();
                if(s<10){
                    s = '0'+s
                }
                context.state.workCountDown = h+':'+m+':'+s
                context.dispatch('checkWorkStatus')
            },1000)
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
            'access_token': context.state.loginData.access_token,
            'member_no': context.state.loginData.member_no
        }
        context.commit('getApiSetting',{which:'getMemberData',params: params})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then(response => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data
                }
                context.state.dataList.memberData = Object.values(response.data.result)[0]
                if(context.state.dataList.memberData.work_finished_at != null){
                    context.commit('getWorkTitle')
                    context.state.workStatus = true
                }else{
                    context.state.workStatus = false
                }
                context.state.dataList.selectList.costumeList = []
                if(Object.values(response.data.result)[0].member_costume.length > 0){
                    Object.values(response.data.result)[0].member_costume.forEach((el) => {
                        context.state.dataList.selectList.costumeList.push(el)
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
        await context.dispatch('getLoginData')
        await context.dispatch('getMemberData')
    },
    submit: async (context) => {
        context.commit('getApiSetting',{which:'submit',paraArr: [context.state.dataList.memberData.member_no]})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then(response => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data
                }
                location.reload()
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