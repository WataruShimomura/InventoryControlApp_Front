<template>
  <p>
    <dev class="name">
      {{ prop.name }}
    </dev>
    <dev class="name" style="width:60px;text-align:center">
      {{ prop.stockNum }}個
    </dev>
    <b-button class="contoller" variant="outline-primary" @click="changeStock(prop.id,1)">
      ＋１
    </b-button>
    <b-button class="contoller" variant="outline-primary" @click="changeStock(prop.id,-1)">
      ー１
    </b-button>
    <b-button variant="danger" @click="deleteStock(prop.id)">
      消去
    </b-button>
    <b-button v-b-modal.modal-1>
      編集
    </b-button>

    <b-modal id="modal-1" title="在庫情報編集">
      <p class="my-4">
        名前 在庫 消去
      </p>
    </b-modal>
  </p>
</template>

<script lang='ts'>
import Vue from 'vue'
import Stock from '@/data/Stock'
import { inventoryModule } from '@/store/Inventory/InventoryStore'

export default Vue.extend({
  props: {
    prop: {
      type: Stock,
      default: {}
    }
  },
  methods: {
    changeStock (id :number, chNum : number) {
      return inventoryModule.addStock(id, chNum)
    },
    deleteStock (id :number) {
      return inventoryModule.deleteStock(id)
    }
  }
})
</script>

<style>
</style>
