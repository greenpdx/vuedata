<template>
  <div class="vue-data">
    <h1>{{ msg }}</h1>
    <div class="hrow">
      <div>
        <select v-model="index">
          <option v-for="n in range(0,9)">{{ n }}</option>
        </select>
      </div>
      <div>
        <select v-model="selectedKey">
          <option v-for="k in keys">{{ k }}</option>
        </select>
      </div>
      <div>
        <button v-on:click="chkClick($event)">Check</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'VueData',

  props: {

  },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      index: 5,
      key: '',
      selectedKey: null,
      dataLoaded: []
    }
  },

  beforeCreate () {
  },

  created () {
    this.loadData()
  },

  beforeMount () {

  },

  mounted () {
  },

  beforeUpdate () {

  },

  updated () {

  },

  methods: {
    ...mapActions({
      setNodes: 'setNodes'
    }),

    chkClick (evt) {
      let itm = this.getNodeByKey(this.selectedKey)
      console.log(Object.assign({}, itm))
    },

    loadData () {
      let self = this
      axios.get('http://10.0.42.81:8181/docs/local/budget/full')
        .then(response => {
          let rslt = response.data
          let data = rslt.data
          self.setNodes(data)
          self.dataLoaded = []
        })
    },

    range (min, max) {
      let ary = []
      for (let i = max; i >= min; i--) {
        ary.push(i)
      }
      return ary
    }

  },

  computed: {
    ...mapGetters([
      'nodes',
      'rawData',
      'getNodeByIdx',
      'getNodeByKey'
    ]),

    keys: function () {
      let ary = this.dataLoaded
      for (let id in this.nodes) {
        ary.push(id)
      }
      this.selectedKey = ary[0]
      console.log('computed', ary)
      return ary
    }

  },

  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hrow {
  display:inline-block;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
