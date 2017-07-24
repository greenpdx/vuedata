// import Vue from 'vue'

var _active = []
/*
var NodeVue = Vue.extend({
  name: 'NodeVue',

  created () {
    this.$on('chgParent', this.chgParent)
    this.$on('chgChild', this.chgChild)
  },
  methods: {
    chgParent (node, val) {

    },
    chgChild (node, val) {

    },
    chgData (val) {

    }
  }
})
*/
export default class Node {
  static get ONE_VAL () {
    return (2 ** 30)
  }
  name = null;
  default = 0;
  value = 0;
  parent = null;
  children = [];
  index = -1;
  selected = false;
  hover = false;

  constructor (name, idx, parent) {
    this.name = name
    this.idx = idx
    this.parent = parent
//    this.node = new NodeVue()
//    this.$on('chgParent', this.chgParent)
//    this.$on('chgChild', this.chgChild)
    this.lidx = _active.push(this) - 1
    this.children = []
    this.test = _active
  }

  static clrNodes () {
    // clean up better
    _active = []
  }

  static getNodes () {
    return _active
  }

  set sum (val) {
    this.default = val
    this.value = val
  }

  get sum () {
    return this.default
  }

  chgChild (chg) {

  }

  chgParent (chg) {

  }

  selectMe () {

  }

  hoverMe () {

  }

  changeMe () {

  }

  static toPercent (val, total) {
    return (val * this.ONE_VAL / total)
  }

  static fromPercent (pct, total) {
    return (pct * total / this.ONE_VAL)
  }
}
