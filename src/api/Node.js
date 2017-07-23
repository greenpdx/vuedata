var _active = []

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
//    this.$on('chgParent', this.chgParent)
//    this.$on('chgChild', this.chgChild)
    this.lidx = _active.push(this) - 1
  }

  static clrNodes () {
    // clean up better
    _active = []
  }

  set sum (val) {
    this.default = val
    this.value = val
  }

  get sum () {
    return this.value
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
