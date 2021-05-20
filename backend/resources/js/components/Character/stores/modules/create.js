const state = {
    dataList: {
        formList: {
            gender: '',
            name: ''
        }
    },
    api: {
        active: null,
        host: localStorage.getItem('HOST'),
        list: {
            submit: {
                baseURL: null,
                url: '/api/character',
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
        gender: '',
        name: ''
    }
}

const getters = {

}
 
const mutations = {
    getApiSetting: (state, payload) => {
        state.api.active = null
        if(typeof payload.which == 'string'){
            if(state.api.list[payload.which] != undefined || state.api.list[payload.which] != null){
                state.api.active = state.api.list[payload.which]
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
    countDownChanged(context, dismissCountDown) {
        context.state.alert.dismissCountDown = dismissCountDown
    },
    submit: async (context) => {
        context.commit('getApiSetting',{which:'submit'})
        if(context.state.api.active != undefined || context.state.api.active != null){
            return new Promise((resolve, reject) => {
                axios(context.state.api.active).then((response) => {
                    console.log(response.data)
                    if(response.data.status != true){
                        throw response.data 
                    }
                    resolve()
                }).catch((error) => { 
                    // context.commit('showAlert')
                    context.state.alert.message = error['result']
                    context.state.validateMsg = error['message']
                    // Object.keys(error).map((key) => {
                    //     context.state.alert.message += key+' : '+error[key]+'\n'
                    // })
                    context.commit('showAlert')
                    reject()
                })
            })
        }else{
            context.state.alert.message = '錯誤的API'
            context.commit('showAlert')
        }
    },
    initPage: async (context) => {

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