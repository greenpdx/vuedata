<template>
  <div class="slider-node">
    <span> {{ toMoney(node.value) }}</span>
    <input
      type="range"
      min="0"
      v-bind:max="max"
      v-bind:value="node.value"
      v-on:input="onChg($event)">
    <button @click="resetVal">Reset</button>
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
    this.defaultVal = this.node.default
    this.tmpVal = this.node.value
    this.max = this.defaultVal * 1.25
  },

  updated () {

  },

  methods: {
    resetVal () {
      this.node.value = this.node.default
      this.$parent.$emit('chgChild', 1)
    },
    toMoney (val) {
      return Math.floor(Node.fromPercent(val, this.total) / 1000)
    },

    onChg (evt) {
      evt.preventDefault()
      evt.stopImmediatePropagation()
//      let node = this.node
//      let comp = node.node
      this.node.value = evt.target.value
      let dif = this.node.value / this.node.default
      this.$parent.$emit('chgChild', dif)
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
.slider-node {
  float: left;
}
</style>
