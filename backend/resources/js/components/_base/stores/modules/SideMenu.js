import axios from "axios";
 
const state = {
    componentName: '',
    linkList: []
}

const getters = {

}
 
const mutations = {
    
}

const actions = {
    getLinkList: async (context) => {
        context.state.linkList = [
            { href: '/character/list' ,text: '列表' },
            { href: '/character/job' ,text: '職業' }
        ]
    },
    initPage: async (context) => {
        await context.dispatch('getLinkList')
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