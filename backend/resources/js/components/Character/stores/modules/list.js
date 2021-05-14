const state = {
    dataList: {
        fields: [
            { key: 'character_no', label: '角色編號', sortable: false },
            { key: 'name', label: '名字', sortable: false },
            { key: 'enable', label: '情報開放狀態', sortable: false },
            { key: 'shelf', label: '販賣狀態', sortable: false },
            { key: 'created_at', label: '建立時間', sortable: false },
            { key: 'detailLink', label: '編輯', sortable: false },
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
    }
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
    }
}

const actions = {
    getItems: async (context) => {
        context.commit('getApiSetting',{which:'getItems'})
        if(context.state.api.active != undefined || context.state.api.active != null){
            return new Promise((resolve, reject) => {
                axios(context.state.api.active).then(response => {
                    console.log(response.data)
                    if(response.data.status != true){
                        throw response.data.message 
                    }
                    context.state.dataList.items = response.data.result
                    if(context.state.dataList.items.lenngth > 1){
                        context.state.dataList.items.forEach((data,index) => {
                            data.detailLink = '/character/'+data.character_no
                            resolve()
                        })
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