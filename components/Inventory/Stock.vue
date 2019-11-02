<template>
  <p>
    <dev class="name">
      {{ prop.name }}
    </dev>
    <dev class="name" style="width:60px;text-align:center">
      {{ prop.stockNum }}個
    </dev>
    <b-button class="contoller" variant="outline-primary">
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
export class StockProps {
  name :String = '';
  id :String = '';
  stockNum :Number = 0;
}
export default Vue.extend({
  props: {
    prop: {
      type: StockProps,
      default: {}
    }
  }
})
</script>

<style>
</style>
