const state = {
    loginData: {
        access_token: null
    },
    editMode: false,
    dataList: {
        stageNo: null,
        showOrder: 1,
        showHour: '00',
        showMinute: '00',
        showSecond: '00',
        formList: {
            area_no: null,
            title: '',
            order: '',
            time: ''
        },
        selectList: {
            area: [{ value: null, text: '無所屬' }]
        }
    },
    api: {
        active: null,
        host: localStorage.getItem('HOST'),
        list: {
            getAreaList: {
                baseURL: null,
                url: '/api/game/area',
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            },
            getData: {
                baseURL: null,
                url: '/api/game/stage',
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            },
            submit: {
                baseURL: null,
                url: '/api/game/stage/edit',
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
        area_no: '',
        title: '',
        order: '',
        time: ''
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
    getAreaList: async (context) => {
        context.commit('getApiSetting',{which:'getAreaList',params:{'enable': '1'}})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then((response) => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data
                }
                context.state.dataList.selectList.area = [{ value: null, text: '無所屬' }]
                Object.values(response.data.result).forEach((el) => {
                    let option = {
                        value: el.area_no,
                        text: el.title
                    }
                    context.state.dataList.selectList.area.push(option)
                })
            }).catch((error) => { 
                context.state.alert.variant = 'danger'
                context.state.alert.message = '區域列表取得失敗'
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
            context.state.alert.variant = 'danger'
            context.state.alert.message = '錯誤的API'
            context.commit('showAlert')
        }
    },
    getData: async (context) => {
        context.commit('getApiSetting',{which:'getData',params:{'area_no': context.state.dataList.areaNo}})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then((response) => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data
                }              
                context.state.dataList.formList = response.data.result[Object.keys(response.data.result)[0]]
                context.state.dataList.showOrder = parseInt(response.data.result[Object.keys(response.data.result)[0]].order) + 1
                context.state.dataList.showHour = response.data.result[Object.keys(response.data.result)[0]].time.split(':')[0]
                context.state.dataList.showMinute = response.data.result[Object.keys(response.data.result)[0]].time.split(':')[1]
                context.state.dataList.showSecond = response.data.result[Object.keys(response.data.result)[0]].time.split(':')[2]
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
            context.state.alert.variant = 'danger'
            context.state.alert.message = '錯誤的API'
            context.commit('showAlert')
        }
    },
    getLoginData: async (context) => {
        if(localStorage.getItem('login_data') != undefined){
            context.state.loginData = JSON.parse(localStorage.getItem('login_data'))
        }else{
            window.location = '/login'
        }
    },
    submit: async (context) => {
        context.commit('getApiSetting',{which:'submit',paraArr:[context.state.dataList.stageNo]})
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
        await context.dispatch('getAreaList')
        await context.dispatch('getData')
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