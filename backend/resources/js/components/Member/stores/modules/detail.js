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
            member_costume: [],
            member_furnishing: []
        },
        addMemberCostume: {
            costume: '',
            amount: ''
        },
        addMemberFurnishing: {
            furnishing: ''
        },
        copy_formList: {}
    },
    fieldList: {
        member_shopspace: [
            { key: 'title', label: '空間名稱', sortable: false },
            { key: 'furnishing_no', label: '擺設家具', sortable: false },
            { key: 'costume_no', label: '架上服裝', sortable: false }
        ],
    },
    selectList:{
        characterList: [],
        costumeList: [],
        shopspaceList: [],
        furnishingList: [],
        memberfurnishingList: [
            {text: '空',value: null}
        ]
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
            getFurnishingList: {
                baseURL: null,
                url: '/api/game/furnishing',
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            },
            getShopspaceList: {
                baseURL: null,
                url: '/api/game/shopspace',
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
        furnishing: {
            furnishing: ''
        },
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
        warwhouse: false,
        furnishing: false
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
            if(state.dataList.addMemberCostume.costume.amount == ''){
                state.dataList.addMemberCostume.costume.amount = 0
            }
            state.dataList.formList.member_costume.push(state.dataList.addMemberCostume.costume)
        }
        state.dataList.addMemberCostume =  {
            costume: '',
            amount: ''
        }
    },
    addMemberFurnishing: (state, payload) => {
        let chk = true
        state.dataList.formList.member_furnishing.forEach((el) => {
            if(el.furnishing_no == state.dataList.addMemberFurnishing.furnishing.furnishing_no){
                chk = false
            }
        })
        if(chk == true){
            state.dataList.formList.member_furnishing.push(state.dataList.addMemberFurnishing.furnishing)
        }
        state.dataList.addMemberFurnishing =  {
            furnishing: ''
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
    removeMemberFurnishing: (context, payload) => {
        state.dataList.formList.member_furnishing.splice(payload,1)
    },
    setFurnishingCostumeInput: (state, payload) => {
        state.dataList.formList.member_shopspace[payload].costume_no = []
        let furnishing_no = state.dataList.formList.member_shopspace[payload].furnishing_no
        state.selectList.furnishingList.forEach((el) => {
            if(el.value.furnishing_no == furnishing_no){
                for(let i = 0;i < el.value.space;i++){
                    state.dataList.formList.member_shopspace[payload].costume_no[i] = ''
                }
            }
        })
    },
    showAlert: (state) => {
        state.alert.dismissCountDown = state.alert.dismissSecs
    },
}

const actions = {
    closeAddCharacter: async (context) => {
        context.state.dataList.formList.member_character = JSON.parse(JSON.stringify(context.state.dataList.copy_formList.member_character))
        context.state.modalStatus.addCharacter = false
    },
    closeFurnishing: async (context) => {
        context.state.dataList.formList.member_furnishing = JSON.parse(JSON.stringify(context.state.dataList.copy_formList.member_furnishing))
        context.state.modalStatus.furnishing = false
    },
    closeWarehouse: async (context) => {
        context.state.dataList.formList.member_costume = JSON.parse(JSON.stringify(context.state.dataList.copy_formList.member_costume))
        context.state.modalStatus.warehouse = false
    },
    getCharacterList: async (context) => {
        context.state.selectList.characterList = []
        context.commit('getApiSetting',{which:'getCharacterList',params:{'shelf': 1}})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then((response) => {
                console.log('CharacterList',response.data)
                if(response.data.status != true){
                    throw response.data
                }
                if(response.data.result.length > 0){
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
                console.log('getData',response.data)
                if(response.data.status != true){
                    throw response.data
                }
                context.state.dataList.formList = response.data.result[Object.keys(response.data.result)[0]]
                let resetArr = []
                context.state.dataList.formList.member_character.forEach((el) => {
                    let reset = {
                        name: el.name,
                        character_no: el.character_no
                    }
                    resetArr.push(reset)
                })

                let resetMemberShopspaceArr = JSON.parse(JSON.stringify(context.state.dataList.formList.member_shopspace))
                context.state.selectList.shopspaceList.forEach((el) => {
                    let chk = false
                    if(context.state.dataList.formList.member_shopspace.length > 0){
                        context.state.dataList.formList.member_shopspace.forEach((el_mss,i) => {
                            if(el_mss.shopspace_no == el.shopspace_no){
                                chk = true
                            }
                        })
                    }
                    if(chk != true){
                        let reset = {
                            member_no: context.state.dataList.memberNo,
                            title: el.title,
                            shopspace_no: el.shopspace_no,
                            furnishing_no: null,
                            costume_no: []
                        }
                        resetMemberShopspaceArr.push(reset)
                    }
                })
                context.state.dataList.formList.member_shopspace = resetMemberShopspaceArr

                context.state.selectList.memberfurnishingList = [
                    {text: '空',value: null}
                ]
                if(context.state.dataList.formList.member_furnishing.length > 0){
                    context.state.dataList.formList.member_furnishing.forEach((el)=>{
                        let reset = {
                            text: el.title,
                            value: el.furnishing_no
                        }
                        context.state.selectList.memberfurnishingList.push(reset)
                    })
                }
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
    getFurnishingList: async (context) => {
        context.state.selectList.furnishingList = [{
            text: '請選擇',
            value: ''
        }]
        context.commit('getApiSetting',{which:'getFurnishingList',params:{'enable': 1}})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then((response) => {
                console.log('FurnishingList',response.data)
                if(response.data.status != true){
                    throw response.data
                }
                Object.keys(response.data.result).map((key) => {
                    let option = {
                        text: response.data.result[key].title,
                        value: response.data.result[key]
                    }
                    context.state.selectList.furnishingList.push(option)
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
    getLoginData: async (context) => {
        if(localStorage.getItem('login_data') != undefined){
            context.state.loginData = JSON.parse(localStorage.getItem('login_data'))
        }else{
            window.location = '/login'
        }
    },
    getShopspaceList: async (context) => {
        context.commit('getApiSetting',{which:'getShopspaceList'})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then((response) => {
                console.log('ShopspaceList',response.data)
                if(response.data.status != true){
                    throw response.data
                }
                context.state.selectList.shopspaceList = response.data.result
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
        context.commit('getApiSetting',{which:'submit',paraArr:[context.state.dataList.memberNo]})
        if(context.state.api.active != undefined || context.state.api.active != null){
            console.log(context.state.api.active)
            axios(context.state.api.active).then((response) => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data
                }
                context.state.alert.variant = 'success'
                context.state.alert.message = response.data['result']
                context.commit('showAlert')
                setTimeout(() => {
                    window.location.reload()
                },5000)
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
        context.state.dataList.formList.update_membercostume = false
        context.state.dataList.formList.update_memberfurnishing = false
    },
    initPage: async (context) => {
        await context.dispatch('getLoginData')
        await context.dispatch('getFurnishingList')
        await context.dispatch('getShopspaceList')
        await context.dispatch('getData')
        await context.dispatch('getCharacterList')
        await context.dispatch('getCostumeList')
    },
    updateCharacter: async (context) => {
        context.state.dataList.formList.update_character = true
        await context.dispatch('submit')
        context.state.modalStatus.addCharacter = false
    },
    updateMemberCostume: async (context) => {
        context.state.dataList.formList.update_membercostume = true
        await context.dispatch('submit')
    },
    updateMemberFurnishing: async (context) => {
        context.state.dataList.formList.update_memberfurnishing = true
        await context.dispatch('submit')
    },
    updateShopspace: async (context) => {
        context.state.dataList.formList.update_membershopspace = true
        await context.dispatch('submit')
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