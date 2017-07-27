<template>
  <div class="tree-view-node">
    <div class="tvn-node">
      <div v-if="node.hasChildren" class="tvn-expand">
        <div v-bind:class="indent" @click="onExpand">
          <span v-show="expanded">&#9660;</span>
          <span v-show="!expanded">&#9658;</span>
        </div>
        <div class="tvn-line" @click="selClick">
          <span class="tvn-amount"> {{ node.showVal() }}</span>
          <span class="tvn-name"> {{ node.name }} </span>
        </div>
        <slider-node
          v-if="selected"
          :node="node"></slider-node>
        <div v-show="expanded">
          <div v-for="node in nodes">
            <tree-view-node
              :node="node"
              :level="level + 1"></tree-view-node>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="tvn-line" @click="selClick">
          <span class="noexpand">&#9866;</span>
          <span class="tvn-amount"> {{ node.showVal() }}</span>
          <span class="tvn-name"> {{ node.name }} </span>
        </div>
        <slider-node
          v-if="selected"
          :node="node"></slider-node>
      </div>
    </div>
    <br/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Node from '@/api/Node'

import SliderNode from './SliderNode'
// import NodeVue from '@/components/NodeVue'

export default {
  name: 'TreeViewNode',
//  mixins: [NodeVue],

  components: {
    SliderNode
  },

  props: {
    node: {
      type: Node
    },
    level: {
      default: 0
    }
  },

  data () {
    return {
      selected: false,
      expanded: false,
      name: '',
      total: 0,
      locked: false
    }
  },

  created () {
    this.name = this.node.name
    this.node.vue.push(this)
    this.total = this.node.total
    this.children = this.node.children
//    console.log('TN', this.children.length, this.hasChildren)
  },

  updated () {
    console.log('tnodeUpdate')
  },

  methods: {
    ...mapActions({
      setSelected: 'setSelected',
      setHover: 'setHover'
    }),
    chgValue (val, node) {
      console.log('chgVal', this.node.name, val, node)
      if (this.lockVal === 0) {
        if (!this.hasChildren) {
          return    // leaf locked
        }
        // change children only
        return
      }
      if (val === this.val) {
        return
      }
      this.val = val
      if (node !== null) {
        this.node.value = val
      }
      this.chgChild(val, this.node)
      this.chgParent(val, this.node)
//      this.node.value = this.lockVal
//      this.node.value = this.node.default + dif
//      this.chgChild(val, null)
//      if (node) {
//        this.chgParent(val, node)
//      }
    },
    chgParent (val, node) {
      this.node.chgParent(val, node)
/*      console.log('Parent', val, node)
      if (node === null) {
        this.chgChild(val, this.node)
      } else {
        val = node.lockVal - val
        this.node.value = this.node.lockVal = this.node.lockVal - val
        console.log(val, this.node.lockVal, node.lockVal)
      }
//      if (this.$parent || node.parent !== -1) {
      this.$parent.$emit('chgParent', val, this.node)
//      } */
    },
    chgChild (val, node) {
      this.node.chgChild(val, node)
/*      let chld = this.$children
      this.node.value = val

      chld.forEach((itm, idx) => {
        val = itm.node.lockVal / node.lockVal * this.node.value
        console.log(val, itm.node.lockVal, node.lockVal)
        if (itm.$options._componentTag === 'tree-view-node') {
          itm.$emit('chgChild', val, this.node)
        }
      }) */
    },
    selClick () {
      console.log('sel', Object.assign({}, this.node))

      this.selected = !this.selected
    },
    onExpand () {
      console.log(this.node.name)
      if (this.expanded) {
        this.expanded = false
      } else {
        this.expanded = true
      }
    }
  },

  computed: {
    ...mapGetters([
      'rawData',
      'getNodeByIdx'
    ]),
//    hasChildren: function () {
//      return (this.children.length > 0)
//    },
    nodes: function () {
//      console.log('TVNnodes', this.node.name, this.node.chld)
      return this.children
    },
    indent: function () {
      let lvl = 'level0'
//      console.log('indent', this.node.name, this.level)
      switch (this.level) {
        case 2:
          lvl = 'level2'
          break
        case 1:
          lvl = 'level1'
          break
        default:
      }
      return lvl
    }
  }
}
</script>

<style scoped>
.tree-view-node {
  display: block;
  float: left;
  width: 45em;
}
.tvn-expand {
  display: inline;
}
.noexpand {
  float: left;
  text-align: right;
  width: 3em;
  cursor: cell;
}
.tvn-expander {
  float: left;
  text-align: left;
  cursor: pointer;
}
.level0 {
  float: left;
  text-align: left;
  cursor: pointer;
  width: 3em;
}
.level1 {
  float: left;
  text-align: left;
  cursor: pointer;
  width: 2em;
  padding-left: 1em;
}
.level2 {
  float: left;
  text-align: left;
  cursor: pointer;
  width: 1em;
  padding-left: 2em;
}
.tvn-node {
  display: inline-block;
  float: left;
  width: 100%
}
.tvn-line {
  text-align: left;
  cursor: cell;
}
.tvn-amount {
  display: inline-block;
  width: 4em;
  text-align: right;
  margin-right: 1em;
}
.tvn-name {
}
</style>
