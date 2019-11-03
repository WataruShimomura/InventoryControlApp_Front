<template>
  <div style="margin-left:50px">
    <h3>
      <div class="name" style="text-align:center">
        在庫名
      </div>
      <div class="name" style="text-align:center">
        残りの数
      </div>
    </h3>
    <div class="stocks">
      <b-card-group class="stocks">
        <stock v-for="stock in apiCall()" :key="stock.id" :prop="stock" />
      </b-card-group>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { inventoryModule } from '@/store/Inventory/InventoryStore'
import Stock from '@/components/Inventory/Stock.vue'

export default Vue.extend({
  components: {
    Stock
  },
  methods: {
    async apiCall () {
      const res = await inventoryModule.stockGet().then((obj) => {
        return obj
      })
      console.log(res)
      return res
    }
  }
})
// export default {
//   components: {
//     Stock
//   },
//   methods: {
//     getStocks () {
//       return [
//         {
//           'id': 1,
//           'name': 'りんご',
//           'stockNum': 10
//         },
//         {
//           'id': 2,
//           'name': 'みかん',
//           'stockNum': 5
//         }
//       ]
//     }
//   }
// }

</script>

<style>
.name{
  display:inline-block;
  width:300px;
  border:solid 3px
}
.stocks{
  display:inline-block
}
.stocks .name{
  display:inline-block;
  border:solid 2px
}
</style>
