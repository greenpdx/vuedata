<template>
  <div class="tree-view-node">
    <div class="tvn-node">
      <div v-if="hasChildren" class="tvn-expand">
        <div v-bind:class="indent" @click="onExpand">
          <span v-show="expanded">&#9660;</span>
          <span v-show="!expanded">&#9658;</span>
        </div>
        <div class="tvn-line" @click="selClick">
          <span class="tvn-amount"> {{ toMoney(n.sum) / 1000 }}</span>
          <span class="tvn-name"> {{ n.name }} </span>
        </div>
        <slider-node v-if="selected" :node="node"></slider-node>
        <div v-if="expanded">
          <div v-for="node in nodes">
            <tree-view-node :node="node" :level="level + 1"></tree-view-node>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="tvn-line" @click="selClick">
          <span class="noexpand">&#9866;</span>
          <span class="tvn-amount"> {{ toMoney(n.sum) / 1000 }}</span>
          <span class="tvn-name"> {{ n.name }} </span>
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

export default {
  name: 'TreeViewNode',
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
      name: ''
    }
  },

  created () {

  },

  updated () {

  },

  methods: {
    ...mapActions({
      setSelected: 'setSelected',
      setHover: 'setHover'
    }),
    selClick () {
      console.log('sel', Object.assign({}, this.node))

      this.selected = !this.selected
    },
    onExpand () {
      console.log(this.n.name)
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
    n: function () {
//      console.log('NEW', this.node.name, this.node.chld)
      return this.node
    },
    hasChildren: function () {
      if (!this.node.children) {
        return false
      }
      return (this.node.children.length !== 0)
    },
    nodes: function () {
//      console.log('TVNnodes', this.node.name, this.node.chld)
      return this.node.children
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
