<template>
  <body style="margin-left:50px">
    <h3>
      <dev class="name" style="text-align:center">
        在庫名
      </dev>
      <dev class="name" style="text-align:center">
        残りの数
      </dev>
    </h3>
    <dev class="stocks">
      <b-card-group class="stocks">
        <stock v-for="stock in getStocks" :key="stock.id" :prop="stock" />
      </b-card-group>
    </dev>
    <p>
      <b-button v-b-modal.modal-1 variant="success">
        新規作成
      </b-button>
    </p>
    <!-- 在庫新規作成modal -->
    <b-modal id="modal-1" title="在庫新規作成">
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
              placeholder="新規在庫名"
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
  </body>
</template>

<script lang='ts'>
import Vue from 'vue'
import { inventoryModule } from '@/store/Inventory/InventoryStore'
import Stock from '@/components/Inventory/Stock.vue'
import StockPayload from '@/data/StockPayload'

export default Vue.extend({
  components: {
    Stock
  },
  data () {
    return {
      form: {
        name: '',
        stockNum: 0
      },
      show: true
    }
  },
  computed: {
    getStocks () {
      return inventoryModule.stocks
    }
  },
  async asyncData () {
    const stocks = await inventoryModule.stockGet()
    return stocks
  },
  methods: {
    onSubmit (evt : Event) {
      evt.preventDefault()
      const order = new StockPayload()
      order.name = this.form.name
      order.stockNum = this.form.stockNum
      // console.log(order)
      return inventoryModule.entryStock(order)
      // alert(JSON.stringify(this.form))
    },
    onReset (evt : Event) {
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
