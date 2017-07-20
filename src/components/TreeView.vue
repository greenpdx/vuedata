<template>
  <div>
    <div>{{ JSON.stringify(tree, null, 2) }}</div>
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TreeViewNode from './TreeViewNode'

export default {
  name: 'TreeView',
  components: {
    TreeViewNode
  },

  props: {
    tree: {
      type: Object,
      required: true
    }
  },

  data () {
    return {

    }
  },

  created () {

  },

  methods: {

  },

  computed: {
    ...mapGetters({

    })

  }
}
</script>

<style scoped>
</style>
