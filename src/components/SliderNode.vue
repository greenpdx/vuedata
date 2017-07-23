<template>
  <div class="slider-node">
    <span> {{ toMoney(tmpVal) / 1000 }}</span>
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
      max: Math.floor(this.defaultVal * 1.2),
      tmpVal: 0,
      defaultVal: 0
    }
  },

  created () {

  },

  updated () {
    console.log('update')
//    this.defaultVal = this.node.sum
  },

  methods: {
    toMoney (val) {
      return Math.floor(Node.fromPercent(val, this.total))
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
      this.tmpVal = val.sum
      this.defaultVal = val.sum
      this.max = Math.floor(val.sum * 1.2)
    }
  },

  computed: {
    ...mapGetters({
      total: 'total'
    }),
    n: function () {
      console.log('N')
      this.tmpVal = this.node.sum
      this.defaultVal = this.node.sum
      return this.node
    },
    hasChildren: function () {
      return (this.node.children.length !== 0)
    }
  }
}
</script>

<style scoped>
</style>
