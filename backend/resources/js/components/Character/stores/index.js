import Vue from 'vue'
import Vuex from 'vuex'
 
import listData from './modules/list.js'
 
Vue.use(Vuex)
 
const storeData =  new Vuex.Store({
    modules: {
        listData: listData,
    }
})
 
export default storeData