import axios from 'axios'

const state = {
    loginData: null,
    dataList: {
        fields: [
            { key: 'title', label: '服裝', sortable: false },
            { key: 'gender_text', label: '性別', sortable: false },
            { key: 'part_text', label: '部位', sortable: false },
            { key: 'amount', label: '庫存', sortable: false },
            { key: 'costume_no', label: '', sortable: false },
        ],
        formList: {},
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
        getCostume: false
    }
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
                context.state.dataList.selectList.costumeList = []
                if(response.data.result[0].member_costume.length > 0){
                    response.data.result[0].member_costume.forEach((el) => {
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
    getCostumeData: async (context, payload) => {
        let formList = {
            bug: payload.bug,
            feather: payload.feather,
            cannabis: payload.cannabis,
            gem: payload.gem,
            amount: 1
        }
        context.state.dataList.formList = formList
        context.state.modalStatus.getCostume = true
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