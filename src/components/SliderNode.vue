<template>
  <div class="slider-node">
    <span> {{ toMoney(n.sum) }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as lib from '@/lib/values'

export default {
  name: 'SliderNode',

  props: {
    node: {}
  },

  data () {
    return {
    }
  },

  created () {

  },

  updated () {
    console.log('updateSN', this.node)
  },

  methods: {
    toMoney (val) {
      return lib.fromPercent(val, this.total)
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
