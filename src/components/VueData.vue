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
    <div class="controls">
      <fieldset class="chkgroup">
        <legend>Select display category</legend>
        <div class="chklist">
          <label class="chkinput"><input v-model="beacat" type="checkbox" value="discretionary"/>
              <span class="chkbox">Discretionary</span></label>
          <label class="chkinput"><input v-model="beacat" type="checkbox" value="mandatory"/>
              <span class="chkbox">Mandatory</span></label>
          <label class="chkinput"><input v-model="beacat" type="checkbox" value="interest">
              <span class="chkbox">Interest</span></label>
        </div>
      </fieldset>
      <div class="chklist">
        <select class="chkinput" v-model="year">
            <option class="chkinput" v-for="n in range(1976,2017)">{{ n }}</option>
          </select>
      </div>
      <button @click="onClick">Test</button>
    </div>
  </div>
  <tree-view :tree="tree">
  </tree-view>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
import axios from 'axios'

import TreeView from './TreeView'

export default {
  name: 'VueData',
  components: {
    TreeView
  },

  props: {

  },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      index: 5,
      key: '',
      selectedKey: null,
      dataLoaded: [],
      year: 2016,
      selectedYear: 2016,
      beacat: ['discretionary'],
      tree: {}
    }
  },

  beforeCreate () {},

  created () {
    this.loadData()
  },

  beforeMount () {

  },

  mounted () {},

  beforeUpdate () {

  },

  updated () {

  },

  methods: {
    ...mapActions({
      setNodes: 'setNodes',
      setActive: 'setActive'
    }),

    onClick (evt) {
      this.rslt = {
        tree: {},
        oldAgency: -1,
        oldBureau: -1
      }
      let ary = this.rawData.filter(this.filterData)
      ary.forEach(this.groupData, this)
      console.log(this.rslt)
      this.setActive(this.rslt.tree)
      this.tree = this.rslt.tree
    },

    groupData (itm, idx) {
      let rslt = this.rslt
      let tree = rslt.tree
      let val = itm[this.selectedYear.toString()]
      let acode = itm.agencycode
      let bcode = itm.bureaucode
      let ccode = itm.acctcode
      let id = itm._id
      if (acode !== rslt.oldAgency) {
        tree[acode] = {
          code: itm.agencycode,
          name: itm.agencyname,
          sum: val,
          idx: idx,
          children: {},
          _id: id
        }
        tree[acode].children[bcode] = {
          code: itm.bureaucode,
          name: itm.bureauname,
          sum: val,
          idx: idx,
          children: {},
          _id: id
        }
        tree[acode].children[bcode].children[ccode] = {
          code: itm.acctcode,
          name: itm.acctname,
          sum: val,
          idx: idx,
          _id: id
        }
        rslt.oldAgency = itm.agencycode
        rslt.oldBureau = itm.bureaucode
      } else if (bcode !== rslt.oldBureau) {
        tree[acode].sum += val
        tree[acode].children[bcode] = {
          code: itm.bureaucode,
          name: itm.bureauname,
          sum: val,
          idx: idx,
          children: {},
          _id: id
        }
        tree[acode].children[bcode].children[ccode] = {
          code: itm.acctcode,
          name: itm.acctname,
          sum: val,
          idx: idx,
          _id: id
        }
        rslt.oldBureau = itm.bureaucode
      } else {
        tree[acode].sum += val
        tree[acode].children[bcode].sum += val
        tree[acode].children[bcode].children[ccode] = {
          code: itm.acctcode,
          name: itm.acctname,
          sum: val,
          idx: idx,
          _id: id
        }
      }
    },

    filterData (itm, idx) {
      let set = new Set(this.beacat)
      if (!set.has(itm.beacat.toLowerCase())) {
        return false
      }
      if (itm.onoffbudget !== 'On-budget') {
        return false
      }
      if (itm[this.selectedYear.toString()] === 0) {
        return false
      }
      return true
    },

    chkClick (evt) {
      let itm = this.getNodeByKey(this.selectedKey)
      console.log(Object.assign({}, itm))
    },

    loadData () {
      let self = this
      axios.get('http://10.0.42.81:8181/docs/local/budget/full?limit=0')
        .then(response => {
          let rslt = response.data
          let data = rslt.data.sort((a, b) => {
            if (a.agencycode > b.agencycode) {
              return 1
            }
            if (a.agencycode < b.agencycode) {
              return -1
            }
            if (a.bureaucode > b.bureaucode) {
              return 1
            }
            if (a.bureaucode < b.bureaucode) {
              return -1
            }
            return 0
          })
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

  watch: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hrow {
  display: inline-block;
}

h1,
h2 {
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
