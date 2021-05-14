const state = {
    dataList: {
        formList: {
            gender: ''
        }
    },
    api: {
        active: null,
        host: localStorage.getItem('HOST'),
        list:{
            submit: {
                baseURL: null,
                url: '/api/character',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            }
        }
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
    }
}

const actions = {
    submit: async (context) => {
        context.commit('getApiSetting',{which:'submit'})
        if(context.state.api.active != undefined || context.state.api.active != null){
            return new Promise((resolve, reject) => {
                axios(context.state.api.active).then(response => {
                    console.log(response.data)
                    if(response.data.status != true){
                        throw response.data.message 
                    }
                }).catch((error) => { 
                    let errorMsg = ''
                    Object.keys(error).map((key) => {
                        errorMsg += key+' : '+error[key]+'\n'
                    })
                    alert(errorMsg)
                    reject()
                })
            })
        }else{
            return []
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