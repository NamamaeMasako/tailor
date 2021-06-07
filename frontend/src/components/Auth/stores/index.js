import Vue from 'vue'
import Vuex from 'vuex'
 
import loginData from './modules/login.js'
import registerData from './modules/register.js'
 
Vue.use(Vuex)
 
const storeData =  new Vuex.Store({
    modules: {
        loginData: loginData,
        registerData: registerData
    }
})
 
export default storeData