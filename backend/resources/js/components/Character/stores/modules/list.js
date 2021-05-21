const state = {
    dataList: {
        fields: [
            { key: 'character_no', label: '角色編號', sortable: false },
            { key: 'name', label: '名字', sortable: false },
            { key: 'enable_text', label: '情報開放狀態', sortable: false },
            { key: 'shelf_text', label: '販賣狀態', sortable: false },
            { key: 'created_at', label: '建立時間', sortable: false },
            { key: 'detailLink', label: '詳細資料', sortable: false },
        ],
        items: [],
        perPage: 10,
        currentPage: 1
    },
    api: {
        active: null,
        host: localStorage.getItem('HOST'),
        list:{
            getItems: {
                baseURL: null,
                url: '/api/character',
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
}

const getters = {
    itemsCount: (state) => {
        return state.dataList.items.length
    }
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
    getItems: async (context) => {
        context.commit('getApiSetting',{which:'getItems'})
        if(context.state.api.active != undefined || context.state.api.active != null){
            axios(context.state.api.active).then(response => {
                console.log(response.data)
                if(response.data.status != true){
                    throw response.data 
                }
                context.state.dataList.items = response.data.result
                if(context.state.dataList.items.length > 0){
                    context.state.dataList.items.forEach((data,index) => {
                        data.created_at = moment(data.created_at).format('YYYY-MM-DD HH:mm:ss');
                        data.detailLink = '/character/'+data.character_no
                    })
                }
            }).catch((error) => { 
                alert(error)
                // context.state.alert.message = error['result']
                // Object.keys(context.state.validateMsg).map((key) => {
                //     if(error['message'][key] != undefined){
                //         context.state.validateMsg[key] = error['message'][key]
                //     }else{
                //         context.state.validateMsg[key] = ''
                //     }
                // })
                // context.commit('showAlert')
            })
        }else{
            return []
        }
    },
    initPage: async (context) => {
        await context.dispatch('getItems')
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