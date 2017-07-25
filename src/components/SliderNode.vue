<template>
  <div class="slider-node">
    <span> {{ Math.floor(node.value / 1000 ) }}</span>
    <input
      type="range"
      min="0"
      v-bind:max="max"
      v-bind:value="node.value"
      v-on:input="onChg($event)"
      v-bind:disabled="locked">
    <input type="checkbox" id="locknode" v-model="locked">
    <label for="locknode">{{ lockname }}</label>
    <button @click="resetVal">Reset</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Node from '@/api/Node'

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
//      defaultVal: 0,
      locked: false,
      lockname: 'Lock'
    }
  },

  created () {
    this.defaultVal = this.node.default
    this.max = this.defaultVal * 1.25
  },

  updated () {

  },

  methods: {
    resetVal () {
      this.node.value = this.node.default
      this.$emit('chgParent', this.node.default, null)
    },

    onChg (evt) {
      evt.preventDefault()
      evt.stopImmediatePropagation()
      this.node.value = evt.target.value
      console.log('inp', evt.target.value)
      this.$emit('chgParent', evt.target.value, null)
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
