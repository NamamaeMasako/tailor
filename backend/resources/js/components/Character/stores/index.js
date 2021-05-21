import Vue from 'vue'
import Vuex from 'vuex'
 
import listData from './modules/list.js'
import createData from './modules/create.js'
import detailData from './modules/create.js'
 
Vue.use(Vuex)
 
const storeData =  new Vuex.Store({
    modules: {
        listData: listData,
        createData: createData,
        detailData, detailData
    }
})
 
export default storeData