<template>
  <div class="tree-view-node">
    <div v-if="hasChildren">
      <slot></slot>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TreeViewNode',

  props: {

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
