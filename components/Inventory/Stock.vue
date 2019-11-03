<template>
  <p>
    <dev class="name">
      {{ prop.name }}
    </dev>
    <dev class="name" style="width:60px;text-align:center">
      {{ prop.stockNum }}個
    </dev>
    <b-button class="contoller" variant="outline-primary" @click="addStock(prop.stockNum,prop.id)">
      ＋１
    </b-button>
    <b-button class="contoller" variant="outline-primary">
      ー１
    </b-button>
    <b-button variant="danger">
      消去
    </b-button>
  </p>
</template>

<script lang='ts'>
import Vue from 'vue'
import Stock from '@/data/Stock'

export default Vue.extend({
  props: {
    prop: {
      type: Stock,
      default: {}
    }
  },
  methods: {
    addStock (id :number) {
      console.log(id)
    }
  }
})
</script>

<style>
</style>
