const state = {
    loginData: {
        access_token: null
    },
    editMode: false,
    dataList: {
        memberNo: null,
        formList: {
            email: '',
            name: '',
            member_character: [],
            member_costume: []
        },
        addMemberCostume: {
            costume: '',
            amount: ''
        },
        copy_formList: {}
    },
    selectList:{
        characterList: [],
        costumeList: []
    },
    api: {
        active: null,
        host: localStorage.getItem('HOST'),
        list: {
            getCharacterList: {
                baseURL: null,
                url: '/api/game/character',
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            },
            getCostumeList: {
                baseURL: null,
                url: '/api/game/costume',
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            },
            getData: {
                baseURL: null,
                url: '/api/data/member',
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            },
            submit: {
                baseURL: null,
                url: '/api/data/member/edit',
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
        email: '',
        name: '',
        bug: '',
        feather: '',
        cannabis: '',
        gem: '',
        coins: '',
        stamina: '',
        level: '',
        experience: '',
        warehouse: {
            costume_no: '',
            amount: ''
        }
    },
    modalStatus: {
        addCharacter: false,
        warwhouse: false
    }
}

const getters = {

}
 
const mutations = {
    addMemberCostume: (state, payload) => {
        state.dataList.addMemberCostume.costume.amount = state.dataList.addMemberCostume.amount
        let chk = true
        state.dataList.formList.member_costume.forEach((el) => {
            if(el.costume_no == state.dataList.addMemberCostume.costume.costume_no){
                chk = false
            }
        })
        if(chk == true){
            state.dataList.formList.member_costume.push(state.dataList.addMemberCostume.costume)
        }
        state.dataList.addMemberCostume =  {
            costume: '',
            amount: ''
        }
    },
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
    removeMemberCostume: (context, payload) => {
        state.dataList.formList.member_costume.splice(payload,1)
    },
    showAlert: (state) => {
        state.alert.dismissCountDown = state.alert.dismissSecs
    },
}

const actions = {
    updateMemberCostume: async (context) => {
        context.state.dataList.formList.update_membercostume = true
        await context.dispatch('submit')
    },
    closeAddCharacter: async (context) => {
        context.state.dataList.formList.member_character = JSON.parse(JSON.stringify(context.state.dataList.copy_formList.member_character))
        context.state.modalStatus.addCharacter = false
    },
    closeWarehouse: async (context) => {
        context.state.modalStatus.warehouse = false
    },
    getCharacterList: async (context) => {
        context.state.selectList.characterList = []
        context.commit('getApiSetting',{which:'getCharacterList',params:{'shelf': 1}})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then((response) => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data
                }
                Object.keys(response.data.result).map((key) => {
                    let option = {
                        text: response.data.result[key].name,
                        value: {
                            name: response.data.result[key].name,
                            character_no: response.data.result[key].character_no
                        }
                    }
                    context.state.selectList.characterList.push(option)
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
            context.commit('showAlert')
        }
    },
    getCostumeList: async (context) => {
        context.state.selectList.costumeList = [{
            text: '請選擇',
            value: ''
        }]
        context.commit('getApiSetting',{which:'getCostumeList',params:{'enable': 1}})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then((response) => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data
                }
                Object.keys(response.data.result).map((key) => {
                    let option = {
                        text: response.data.result[key].title,
                        value: {
                            title: response.data.result[key].title,
                            costume_no: response.data.result[key].costume_no
                        }
                    }
                    context.state.selectList.costumeList.push(option)
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
            context.commit('showAlert')
        }
    },
    getData: async (context) => {
        context.commit('getApiSetting',{which:'getData',params:{'member_no': context.state.dataList.memberNo}})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then((response) => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data
                }
                context.state.dataList.formList = response.data.result[Object.keys(response.data.result)[0]]
                let resetArr = []
                context.state.dataList.formList.member_character.forEach((el)=>{
                    let reset = {
                        name: el.name,
                        character_no: el.character_no
                    }
                    resetArr.push(reset)
                })
                context.state.dataList.formList.member_character = resetArr
                context.state.dataList.copy_formList = JSON.parse(JSON.stringify(context.state.dataList.formList))
                context.state.dataList.formList.update_character = false
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
        context.commit('getApiSetting',{which:'submit',paraArr:[context.state.dataList.memberNo]})
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
            context.state.alert.variant = 'danger'
            context.state.alert.message = '錯誤的API'
            context.commit('showAlert')
        }
        context.state.dataList.formList.update_character = false
    },
    initPage: async (context) => {
        await context.dispatch('getLoginData')
        await context.dispatch('getData')
        await context.dispatch('getCharacterList')
        await context.dispatch('getCostumeList')
    },
    updateCharacter: async (context) => {
        context.state.dataList.formList.update_character = true
        await context.dispatch('submit')
        context.state.modalStatus.addCharacter = false
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