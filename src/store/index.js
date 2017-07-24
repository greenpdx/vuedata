import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
// import axios from 'axios'

Vue.use(Vuex)

import { node } from './modules/node'

const debug = process.env.NODE_ENV !== 'production'

const state = {
  dataNodes: [],
  rawIds: {},
  activeNodes: [],
  total: 0,
  selectNode: null,
  hoverNode: null,
  tree: []
}

const getters = {
  total: state => state.total,
  rawIds: state => state.rawIds,
  rawData: state => state.dataNodes,
  getNodeByIdx: state => (idx) => {
    return state.dataNodes[idx]
  },
  getNodeByKey: state => (key) => {
    return state.dataNodes[state.nodes[key].idx]
  },
  getActiveNodes: state => state.activeNodes,
  getTree: state => state.tree,
  getTreeByIdx: state => (idx) => {
    return state.tree[idx]
  },
  getHoverNode: state => {
    return state.hoverNode
  },
  getSelectedNode: state => {
    return state.selectNode
  }
}

const mutations = {
  SETNODES (state, nodes) {
    if (state.dataNodes.length === 0) {
      state.dataNodes = nodes
      nodes.forEach(function (itm, idx) {
        state.rawIds[itm._id] = {idx: idx}
      })
    }
  },
  SETACTIVENODES (state, tree) {
    state.activeNodes = tree
  },
  SETTOTAL (state, total) {
    state.total = total
  },
  SETTREE (state, tree) {
    state.tree = tree
  },
  SETSELECT (state, select) {
    state.selectNode = select
  },
  SETHOVER (state, hover) {
    state.hoverNode = hover
  },
  ADDACTIVENODE (state, node) {
    state.activeNodes.push(node)
  },
  CLRACTIVE (state) {
    // clean up better
    state.activeNodes = []
  }
}

const actions = {
  setNodes ({commit}, nodes) {
    commit('SETNODES', nodes)
  },
  setActiveNodes ({commit}, tree) {
    commit('SETACTIVE', tree)
  },
  setTotal ({commit}, total) {
    commit('SETTOTAL', total)
  },
  setTree ({commit}, tree) {
    commit('SETTREE', tree)
  },
  setSelected ({commit}, select) {
    if (state.selectedNode && state.selectedNode !== select) {
      commit('SETSELECT', null)
    }
    commit('SETSELECT', select)
  },
  setHover ({commit}, node) {
    if (state.hoverNode && state.hoverNode !== node) {
      commit('SETHOVER', null)
    }
    commit('SETHOVER', node)
  },
  addActiveNode ({commit}, node) {
    commit('ADDACTIVENODE', node)
  },
  clrActiveNodes ({commit}) {
    commit('CLRACTIVE')
  }
}

const modules = {
  node: node
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
