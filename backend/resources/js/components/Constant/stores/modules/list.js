const state = {
    loginData: null,
    dataList: {
        formList: {
            dataArr: []
        },
        selectList: {
            continue: false,
            url: {}
        },
        items: {},
        perPage: 10,
        currentPage: 1
    },
    api: {
        active: null,
        host: localStorage.getItem('HOST'),
        list:{
            getItems: {
                baseURL: null,
                url: '/api/data/constant',
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            },
            getUrlList: {
                baseURL: null,
                url: '/api/system/url',
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            },
            updateConstant: {
                baseURL: null,
                url: '/api/data/constant/edit',
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
    memberExpCheck: (state, payload) => {
        state.dataList.selectList.continue = false
        console.log(state.dataList.items.member.experience[payload].text[1] == '' || state.dataList.items.member.experience[payload].text[1] == undefined)
        if(state.dataList.items.member.experience[payload+1] != undefined){
            if(state.dataList.items.member.experience[payload].text[1] == null || state.dataList.items.member.experience[payload].text[1] == '' || state.dataList.items.member.experience[payload].text[1] == undefined){
                state.dataList.items.member.experience[payload].text[1] = state.dataList.items.member.experience[payload].text[0]
            }
            Vue.set(state.dataList.items.member.experience[payload+1].text, 0, parseInt(state.dataList.items.member.experience[payload].text[1])+1)
            if(state.dataList.items.member.experience[payload+1].text[1] < state.dataList.items.member.experience[payload+1].text[0]){
                Vue.set(state.dataList.items.member.experience[payload+1].text, 1, parseInt(state.dataList.items.member.experience[payload+1].text[0]))
            }
            state.dataList.selectList.continue = true
        }
    },
    showAlert: (state, payload) => {
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
    getItems: async (context) => {
        context.commit('getApiSetting',{which:'getItems'})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then(response => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data 
                }
                context.state.dataList.selectList.functionTitleList = response.data.result.function_title_arr
                delete response.data.result.function_title_arr
                context.state.dataList.items = response.data.result
                Object.keys(context.state.dataList.items).forEach((index) => {
                    Object.keys(context.state.dataList.items[index]).forEach((index_i) => {
                        if(index == 'stage' && index_i == 'resource'){
                            context.state.dataList.items[index][index_i].forEach((el) => {
                                el.usage = el.usage.split('|')
                            })
                        }
                        if(index == 'member' && index_i == 'experience'){
                            context.state.dataList.items[index][index_i].forEach((el) => {
                                el.text = el.text.split('|')
                            })
                        }
                    })
                })
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
                console.log(error)
                context.commit('showAlert')
            })
        }else{
            context.state.alert.variant = 'danger'
            context.state.alert.message = '錯誤的API'
        }
    },
    getUrlList: async (context) => {
        context.commit('getApiSetting',{which:'getUrlList'})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then(response => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data 
                }
                context.state.dataList.selectList.url = {}
                response.data.result.forEach((el) => {
                    let key = el.path.split('/')[1]
                    context.state.dataList.selectList.url[key] = el.title
                })
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
        }
    },
    initPage: async (context) => {
        await context.dispatch('getLoginData')
        await context.dispatch('getUrlList')
        await context.dispatch('getItems')
    },
    renewMemberExp:  async (context, payload) => {
        context.commit('memberExpCheck',payload)
        if(context.state.dataList.selectList.continue == true){
            await context.dispatch('renewMemberExp', payload+1)
        }
    },
    updateConstant: async (context, payload) => {
        context.state.dataList.formList.dataArr = []
        if(Array.isArray(payload)){            
            context.state.dataList.items[payload[0]][payload[1]].forEach((el) => {
                let data = Object.assign({},el)
                context.state.dataList.formList.dataArr.push(data)
            })
            if(payload[0] == 'stage'){
                if(payload[1] == 'resource'){
                    context.state.dataList.formList.dataArr.forEach((el) => {
                        el.usage = el.usage.join('|')
                    })
                }
            }else if(payload[0] == 'member'){
                if(payload[1] == 'experience'){
                    context.state.dataList.formList.dataArr.forEach((el) => {
                        el.text = el.text.join('|')
                    })
                }
            }
        }
        context.commit('getApiSetting',{which:'updateConstant',paraArr:payload})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then(response => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data 
                }
                context.state.alert.variant = 'success'
                context.state.alert.message = response.data['result']
                context.commit('showAlert')
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