import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

import nodes from './modules/nodes'

// const debug = process.env.NODE_ENV !== 'production'

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
}

const modules = {
  nodes: nodes
}
// strict = debug
//  plugins: debug ? [createLogger()] : []
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
