<template>
  <div class="tree-view-node">
    <div class="tvn-node">
      <div v-if="hasChildren" class="tvn-expand">
        <div v-bind:class="indent" @click="onExpand">
          <span v-show="expanded">&#9660;</span>
          <span v-show="!expanded">&#9658;</span>
        </div>
        <div class="tvn-line" @click="selClick">
          <span class="tvn-amount"> {{ Math.floor(toMoney(node.value) / 1000) }}</span>
          <span class="tvn-name"> {{ node.name }} </span>
        </div>
        <slider-node v-if="selected" :node="node"></slider-node>
        <div v-show="expanded">
          <div v-for="node in nodes">
            <tree-view-node :node="node" :level="level + 1"></tree-view-node>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="tvn-line" @click="selClick">
          <span class="noexpand">&#9866;</span>
          <span class="tvn-amount"> {{ Math.floor(toMoney(node.value) / 1000) }}</span>
          <span class="tvn-name"> {{ node.name }} </span>
        </div>
        <slider-node v-if="selected" :node="node"></slider-node>
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
    node: {},
    level: {
      default: 0
    }
  },

  data () {
    return {
      selected: false,
      expanded: false,
      name: '',
      hasChildren: false
    }
  },

  created () {
    this.name = this.node.name
    this.node.vue = this
    this.children = this.node.children
    this.hasChildren = (this.children.length > 0)
    this.$on('chgChild', this.chgValue)
    this.$on('chgParent', this.chgValue)
//    console.log('TN', this.children.length, this.hasChildren)
  },

  updated () {

  },

  methods: {
    ...mapActions({
      setSelected: 'setSelected',
      setHover: 'setHover'
    }),
    chgValue (dif) {
      if (this.dif !== dif) {
        this.dif = dif
        this.node.value = this.node.default * dif
        this.chgChild(dif)
        this.chgParent(dif)
      }
    },
    chgParent (dif) {
      if (this.$parent) {
        this.$parent.$emit('chgParent', dif)
      }
    },
    chgChild (dif) {
      let chld = this.$children
      chld.forEach((itm, idx) => {
        if (itm.$options._componentTag === 'tree-view-node') {
          itm.$emit('chgChild', dif)
          console.log('chgSlider', dif)
        }
      })
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
    },
    toMoney (val) {
      return Math.floor(Node.fromPercent(val, this.total) + 0.00001)
    }
  },

  computed: {
    ...mapGetters([
      'total',
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
