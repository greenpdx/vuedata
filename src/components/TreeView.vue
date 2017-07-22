<template>
  <div class="tree-view">
    <div v-for="node in nodes">
      <div>
        <tree-view-node :node="node">
          <!-- slider-node v-show="selected":node="node"></slider-node -->
        </tree-view-node>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import * as lib from '@/lib/values'

import TreeViewNode from './TreeViewNode'

export default {
  name: 'TreeView',
  components: {
    TreeViewNode
  },

  props: {
    tree: {
//      type: Object,
      required: true
    }
  },

  data () {
    return {
      selectedNode: null
    }
  },

  created () {
  },

  methods: {
  },

  updated () {
    this.nodes = this.tree
  },

  computed: {
    ...mapGetters({
      total: 'total'
    }),

    nodes: function () {
      return this.tree
    }
  }
}
</script>

<style scoped>
</style>
