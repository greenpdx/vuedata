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
        <select @change="onSelect($event)" class="chkinput" v-model="year">
            <option class="chkinput" v-for="n in range(1976,2017)">{{ n }}</option>
          </select>
      </div>
      <button @click="onClick">Test</button>
    </div>
  </div>
  <div class='tree-view'>
    <span> {{ total }} </span>
    <tree-view :tree="tree">
    </tree-view>
  </div>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
import axios from 'axios'
import * as lib from '@/lib/values'

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
      rawTree: {
        total: 0,
        tree: []
      },
      total: 0,
      tree: []
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
      setActive: 'setActive',
      setTotal: 'setTotal',
      setTree: 'setTree'
    }),

    onSelect (evt) {
      console.log('CHG', evt.target.value)
      this.selectedYear = evt.target.value
    },

    sortSum (a, b) {
      if (a.sum > b.sum) { return -1 }
      if (a.sum < b.sum) { return 1 }
      return 0
    },

    onClick (evt) {
      let ary = this.rawData
      this.total = 0
      let rslt = this.groupData(ary, this.filterData)
      console.log(rslt)
      this.setTree(rslt.tree)
      this.tree = rslt.tree
      this.setTotal(rslt.total)
    },

    groupData (nodes, filterCB) {
      let map = {}
      let tree = []
//      let active = []
      let node
      let total = 0
      nodes.forEach((itm, idx) => {
        if (!filterCB(itm)) {
          return
        }

        node = itm
//        let id = node._id
        let val = node[this.selectedYear.toString()]
        total += val
        let parent = -1
        if (!map[node.agencycode]) {
          let tmp = map[node.agencycode] = {
            name: node.agencyname,
//            code: node.agencycode,
            sum: 0,
            chld: {},
            idx: idx,
            prnt: parent
          }
          tree.push(tmp)
        }
        parent = map[node.agencycode].idx
        map[node.agencycode].sum += val
        if (!map[node.agencycode].chld[node.bureaucode]) {
          map[node.agencycode].chld[node.bureaucode] = {
            name: node.bureauname,
//            prnt: id + 'A',
//            code: node.bureaucode,
            sum: 0,
            chld: [],
            idx: idx,
//            _id: id + 'B',
            prnt: parent
          }
        }
        parent = map[node.agencycode].chld[node.bureaucode].idx
        map[node.agencycode].chld[node.bureaucode].sum += val
        map[node.agencycode].chld[node.bureaucode].chld.push({
          name: node.acctname,
          sum: val,
          prnt: parent,
//          code: node.acctcode,
//          _id: node._id,
          idx: idx,
          chld: null
        })
      })
      this.setTotal(total)
      tree.sort((a, b) => this.sortSum(a, b))
      for (let a of tree) {
        a.sum = lib.toPercent(a.sum, total)
        let achld = Object.values(a.chld)
        achld.sort((a, b) => this.sortSum(a, b))
        a.chld = achld
        for (let b of achld) {
          b.sum = lib.toPercent(b.sum, total)
          let bchld = b.chld
          bchld.sort((a, b) => this.sortSum(a, b))
          b.chld = bchld
          for (let c of bchld) {
            c.sum = lib.toPercent(c.sum, total)
          }
        }
      }

      this.rawTree.total = total
      this.rawTree.tree = tree
      return {total: total, tree: tree}
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
      this.total += itm[this.selectedYear.toString()]
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
.tree-view {
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
