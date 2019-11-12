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
    <b-button @click="modalShow = !modalShow">
      編集
    </b-button>

    <!-- <b-modal :id="'modal-'+ prop.id" title="在庫情報編集"> -->
    <b-modal v-model="modalShow" title="在庫情報編集">
      <p class="my-4" />
      <div>
        <b-form v-if="show" @submit="onSubmit" @reset="onReset">
          <b-form-group
            id="input-group-1"
            label="在庫名:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.name"
              type="text"
              required
              placeholder="在庫名"
            />
          </b-form-group>

          <b-form-group id="input-group-2" label="在庫数:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.stockNum"
              type="number"
              required
              placeholder="在庫数"
            />
          </b-form-group>

          <b-button type="submit" variant="primary">
            Submit
          </b-button>
          <b-button type="reset" variant="danger">
            Reset
          </b-button>
        </b-form>
        <!-- <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
        </b-card> -->
      </div>
    </b-modal>
  </p>
</template>

<script lang='ts'>
import Vue from 'vue'
import AddStockPayload from '@/data/AddStockPayload'
import { inventoryModule } from '@/store/Inventory/InventoryStore'
import StockPayload from '@/data/StockPayload'

export default Vue.extend({
  props: {
    prop: {
      type: StockPayload,
      default: {}
    }
  },
  data () {
    return {
      form: {
        name: '',
        stockNum: 0
      },
      modalShow: false,
      show: true
    }
  },
  methods: {
    changeStock (id :number, chNum : number) {
      const order = new AddStockPayload()
      order.id = id
      order.sumValue = chNum
      return inventoryModule.addStock(order)
    },
    deleteStock (id :number) {
      return inventoryModule.deleteStock(id)
    },
    onSubmit (evt) {
      evt.preventDefault()
      const order = new StockPayload()
      order.name = this.form.name
      order.stockNum = this.form.stockNum
      // console.log(order)
      return inventoryModule.upDateStock(order)
      // alert(JSON.stringify(this.form))
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.name = ''
      this.form.stockNum = 0
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
})
</script>

<style>
</style>
