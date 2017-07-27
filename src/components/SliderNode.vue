<template>
  <div class="slider-node">
    <span> {{ node.showVal(value) }}</span>
    <input
      type="range"
      min="0"
      v-bind:max="max"
      v-bind:value="value"
      v-on:input="onChg($event)"
      v-bind:disabled="locked">
    <input type="checkbox" id="locknode" v-model="locked">
    <label for="locknode">{{ lockname }}</label>
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
      type: Node
    }
  },

  data () {
    return {
      min: 0,
      max: 0,
      tmpVal: 0,
//      defaultVal: 0,
      locked: false,
      lockname: 'Lock',
      value: 0
    }
  },

  created () {
    this.defaultVal = this.node.default
    this.value = this.node.value
    this.max = this.defaultVal * 1.25
  },

  updated () {
    this.value = this.node.value
  },

  methods: {
    resetVal () {
      this.value = this.node.default
      this.node.chgValue(this.value)
    },

    onChg (evt) {
      evt.preventDefault()
      evt.stopImmediatePropagation()
      this.value = evt.target.value
      console.log('inp', evt.target.value)
      this.node.chgValue(evt.target.value)
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
    })
  }
}
</script>

<style scoped>
.slider-node {
  float: left;
}
</style>
