import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
//业务模块引用


Vue.use(Vuex)

//业务模块module
const modules = {}

const store = new Vuex.Store({
  modules: {
    app,
    user,
    ...modules
  },
  getters
})

export default store
