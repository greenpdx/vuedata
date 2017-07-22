<template>
  <div class="tree-view-node"
    @click="selClick">
    <div v-if="hasChildren">
      <div>
        <span> {{ toMoney(n.sum) }}</span> <span> {{ n.name }} </span>
        <slider-node v-show="selected" :node="node"></slider-node>
      </div>
    </div>
    <div v-else>
      <div>
        <span> {{ toMoney(n.sum) }}</span> <span> {{ n.name }} </span>
        <!-- slider-node v-show="selected" :node="n"></slider-node -->
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
      selected: false
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
</style>
