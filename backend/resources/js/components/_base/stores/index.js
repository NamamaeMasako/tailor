import Vue from 'vue'
import Vuex from 'vuex'
 
import headerNavData from './modules/HeaderNav.js'
import sideMenuData from './modules/SideMenu.js'
 
Vue.use(Vuex)
 
const storeData =  new Vuex.Store({
    modules: {
        headerNavData: headerNavData,
        sideMenuData: sideMenuData
    }
})
 
export default storeData