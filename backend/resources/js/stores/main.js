import Vue from 'vue'
import Vuex from 'vuex'
 
import headerNavData from './_base/HeaderNav.js'
import CharacterListData from './Character/list.js'
 
Vue.use(Vuex)
 
const storeData =  new Vuex.Store({
    modules: {
        headerNavData: headerNavData,
        CharacterListData: CharacterListData
    }
})
 
export default storeData