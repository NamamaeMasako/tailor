const state = {
    editMode: false,
    dataList: {
        areaNo: null,
        showOrder: 1,
        fields: [
            { key: 'stage_no', label: '任務編號', sortable: false },
            { key: 'title', label: '名稱', sortable: false },
            { key: 'order', label: '順序', sortable: false },
            { key: 'time', label: '執行時間', sortable: false },
            { key: 'enable_text', label: '開放狀態', sortable: false },
            { key: 'created_at', label: '建立時間', sortable: false },
            { key: 'detailLink', label: '詳細資料', sortable: false },
        ],
        perPage: 10,
        currentPage: 1,
        formList: {
            title: '',
            order: ''
        }
    },
    api: {
        active: null,
        host: localStorage.getItem('HOST'),
        list: {
            getData: {
                baseURL: null,
                url: '/api/game/area',
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            },
            submit: {
                baseURL: null,
                url: '/api/game/area/edit',
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
                state.api.active = state.api.list[payload.which]
                if(state.api.active.method == 'post'){
                    state.api.active.data = state.dataList.formList
                }else if(state.api.active.method == 'get'){
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
    updateOrder: (state, payload) => {
        console.log('updateOrder')
        console.log(payload)
    }
}

const actions = {
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
                if(context.state.dataList.formList.stage.length > 0){
                    context.state.dataList.formList.stage.forEach((data) => {
                        data.order = parseInt(data.order) + 1
                        data.created_at = moment(data.created_at).format('YYYY-MM-DD HH:mm:ss');
                        data.detailLink = '/game/stage/'+data.stage_no
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
            context.state.alert.variant = 'danger'
            context.state.alert.message = '錯誤的API'
            context.commit('showAlert')
        }
    },
    submit: async (context) => {
        context.commit('getApiSetting',{which:'submit',paraArr:[context.state.dataList.areaNo]})
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