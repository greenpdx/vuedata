<template>
  <div class="slider-node">
    <span> {{ toMoney(tmpVal) }}</span>
    <input
      type="range"
      min="0"
      v-bind:max="max"
      v-bind:value="tmpVal"
      v-on:input="onChg($event)">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Node from '@/api/Node'

export default {
  name: 'SliderNode',

  props: {
    node: {
      type: Object,
      default: {}
    }
  },

  data () {
    return {
      min: 0,
      max: 0,
      tmpVal: 0,
      defaultVal: 0
    }
  },

  created () {
    this.defaultVal = this.node.sum
    this.tmpVal = this.node.sum
    this.max = this.defaultVal * 1.25
  },

  updated () {

  },

  methods: {
    toMoney (val) {
      return Math.floor(Node.fromPercent(val, this.total) / 1000)
    },

    onChg (evt) {
      evt.preventDefault()
      evt.stopImmediatePropagation()
      this.tmpVal = evt.target.value
    }
  },

  watch: {
    node: function (val, old) {
      console.log('watch',
        Object.assign({}, val),
        Object.assign({}, old))
    }
  },

  computed: {
    ...mapGetters({
      total: 'total'
    }),
    hasChildren: function () {
      return (this.node.children.length !== 0)
    }
  }
}
</script>

<style scoped>
</style>
