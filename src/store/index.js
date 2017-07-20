import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
// import axios from 'axios'

Vue.use(Vuex)

import nodes from './modules/nodes'

const debug = process.env.NODE_ENV !== 'production'

const state = {
  dataNodes: [],
  nodes: {},
  activeNodes: {}
}

const getters = {
  nodes: state => state.nodes,
  rawData: state => state.dataNodes,
  getNodeByIdx: state => (idx) => {
    return state.dataNodes[idx]
  },
  getNodeByKey: state => (key) => {
    return state.dataNodes[state.nodes[key].idx]
  },
  getActiveNodes: state => state.activeNodes
}

const mutations = {
  SETNODES (state, nodes) {
    if (state.dataNodes.length === 0) {
      state.dataNodes = nodes
      nodes.forEach(function (itm, idx) {
        state.nodes[itm._id] = {idx: idx}
      })
    }
  },
  SETACTIVE (state, tree) {
    state.activeNodes = tree
  }
}

const actions = {
  setNodes ({commit}, nodes) {
    commit('SETNODES', nodes)
  },
  setActive ({commit}, tree) {
    commit('SETACTIVE', tree)
  }
}

const modules = {
  nodes: nodes
}

// const strict = debug
// const plugins = debug ? [createLogger()] : []

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
  plugins: debug ? [createLogger()] : []
})
