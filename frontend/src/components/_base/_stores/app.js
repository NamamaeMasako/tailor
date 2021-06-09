import Vue from 'vue'
import Vuex from 'vuex'
 
import footerNavData from './modules/footerNav.js'
import headerNavData from './modules/headerNav.js'
 
Vue.use(Vuex)
 
const storeData =  new Vuex.Store({
    modules: {
        headerNavData: headerNavData,
        footerNavData: footerNavData
    }
})
 
export default storeData