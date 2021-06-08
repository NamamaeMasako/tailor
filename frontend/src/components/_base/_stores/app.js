import Vue from 'vue'
import Vuex from 'vuex'
 
import footerNavData from './modules/footerNav.js'
 
Vue.use(Vuex)
 
const storeData =  new Vuex.Store({
    modules: {
        footerNavData: footerNavData
    }
})
 
export default storeData