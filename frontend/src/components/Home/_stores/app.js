import Vuex from 'vuex'

import indexData from './modules/index.js'
 
const storeData =  new Vuex.Store({
    modules: {
        indexData: indexData
    }
})
 
export default storeData