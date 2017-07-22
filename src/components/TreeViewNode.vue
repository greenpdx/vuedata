<template>
  <div class="tree-view-node">
    <div @click="selClick" class="tvn-node">
      <div v-if="hasChildren" class="tvn-expand">
        <div class="tvn-expander">
          <span v-if="expanded">&#9660;</span>
          <span v-else>&#9658;</span>
        </div>
        <div>
          <span class="tvn-amount"> {{ toMoney(n.sum) }}</span>
          <span class="tvn-name"> {{ n.name }} </span>
          <slider-node v-show="selected" :node="node"></slider-node>
        </div>
        <br>
      </div>
      <div v-else>
        <div>
          <span> {{ toMoney(n.sum) }}</span> <span> {{ n.name }} </span>
          <!-- slider-node v-show="selected" :node="n"></slider-node -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as lib from '@/lib/values'
import SliderNode from './SliderNode'

export default {
  name: 'TreeViewNode',
  components: {
    SliderNode
  },

  props: {
    node: {}
  },

  data () {
    return {
      selected: false,
      expanded: false
    }
  },

  created () {

  },

  updated () {

  },

  methods: {
    selClick () {
      this.selected = true
    },
    toMoney (val) {
      return Math.floor(lib.fromPercent(val, this.total) + 0.00001)
    }
  },

  computed: {
    ...mapGetters({
      total: 'total'
    }),
    n: function () {
      return this.node
    },
    hasChildren: function () {
      return (this.node.chld.length !== 0)
    }
  }
}
</script>

<style scoped>
.tree-view-node {
  display: block;
  float: left;
  width: 100%
}
.tvn-expand {
  display: block;
}.
.tvn-expander {

}
.tvn-node {
  display: inline-block;
}
.tvn-amount {
  display: inline-block;
  width: 4em;
  text-align: left;
}
.tvn-name {
  width: 300px;
}
</style>
