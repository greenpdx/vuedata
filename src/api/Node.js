// import Vue from 'vue'

var _active = []
var _total = 0

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
//    this.lidx = _active.push(this) - 1
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

  get total () {
    return _total
  }
  set total (val) {
    _total = val
  }
  set sum (val) {
    this.default = val
    this.value = val
    this.lockVal = val
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

  static toPercent (val) {
    return (val * this.ONE_VAL / _total)
  }

  static fromPercent (pct) {
    return (pct * _total / this.ONE_VAL)
  }
}
