const state = {
  name: null,
  default: 0,
  value: 0,
  parent: null,
  children: [],
  index: -1,
  selected: false,
  hover: false
}

const getters = {
  name: state => state.node.name,
  parent: state => state.node.parent,
  children: state => state.node.children,
  selected: state => state.node.selected,
  hover: state => state.hover,
  index: state => state.index,
  default: state => state.default,
  value: state => state.value,
  sum: state => state.default
}

const mutations = {
  NAME (state, name) {
    state.name = name
  },
  PARENT (state, prnt) {
    state.parent = prnt
  },
  CHILDREN (state, chld) {
    state.children = chld
  },
  SELECTED (state, sel) {
    state.selected = sel
  },
  HOVER (state, hover) {
    state.hover = hover
  },
  INDEX (state, idx) {
    state.index = idx
  },
  DEFAULT (state, val) {
    state.default = val
  },
  VALUE (state, val) {
    state.value = val
  },
  ADDCHILD (state, chld) {
    state.children.push(chld)
  }
}

const actions = {
  sum ({commit}, val) {
    commit('DEFAULT', val)
  },
  default ({commit}, val) {
    commit('DEFAULT', val)
  },
  value ({commit}, val) {
    commit('VALUE', val)
  },
  index ({commit}, idx) {
    commit('INDEX', idx)
  },
  hover ({commit}, bool) {
    commit('HOVER', bool)
  },
  selected ({commit}, bool) {
    commit('SELECTED', bool)
  },
  name ({commit}, name) {
    commit('NAME', name)
  },
  parent ({commit}, prnt) {
    commit('PARENT', prnt)
  },
  children ({commit}, chld) {
    commit('CHILDREN', chld)
  },
  addChild ({commit}, chld) {
    commit('ADDCHILD', chld)
  },
  newNode ({commit}, name, idx, parent) {
    commit('NAME', name)
    commit('PARENT', parent)
    commit('INDEX', idx)
    commit('CHILDREN', [])
  }
}

export const node = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}

export class NodeStore {
  node = node
  constructor (name, idx, parent) {
    this.node = node
    this.node.actions.newNode(name, idx, parent)
  }
}
