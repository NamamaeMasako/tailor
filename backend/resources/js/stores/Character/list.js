import axios from "axios";
 
const state = {
    TextValue: ''
}

const getters = {}
 
const mutations = {
    FUNCTION_NAME (state,payload) {
        state.VarA = payload
    }
}
 
const actions = {
    async FUNCTION_NAME ({commit}) {
        //do something
        commit('FUNCTION_NAME',payload)
        //紀錄一下加了async是因為用非同步的axios去API拿資料
    }
}
 
export default {
    namespaced: true,//用namespace 叫資料比較方便
    state,
    mutations,
    actions
}