import { VuexModule, Module, Mutation, getModule, Action } from 'vuex-module-decorators'
import store from "~/store/store";
import axios from '@/plugins/axios'
import AddStockPayload from '@/data/AddStockPayload'
import StockPayload from '~/data/StockPayload';
import '@/pages/inventory/stocklist'

export interface InventoryState {
   stocks:Array<StockPayload>;
}

  @Module({dynamic: true, store, namespaced: true, name: 'InventoryStore' })
  class InventoryStore extends VuexModule implements InventoryState {
    stocks = [new StockPayload()];

    // @Mutation
    // addPost(param: string) {
    //   this.param1 =param
    // }

    @Mutation
    changeStocks(param: Array<StockPayload>) {
      this.stocks =param
    }

    @Mutation
    changeStockNum(stock :AddStockPayload){
      const index = this.stocks.findIndex((tag) =>{
        return tag.id === stock.id
      })
      console.log(index)
      const tag = this.stocks[index]
      tag.stockNum = tag.stockNum + stock.sumValue
      if(tag.stockNum < 0){
        tag.stockNum = 0
      }
    }

    @Mutation
    deleteStockExe(ids :number){
      const index = this.stocks.findIndex((tag) =>{
        return tag.id === ids
      })
      console.log(index)
      this.stocks.splice(index,1)
    }

    @Mutation
    entryStockExe(newStock :StockPayload){
      console.log(newStock)
      this.stocks.push(newStock)
    }

    @Mutation
    upDateStockExe(stock :StockPayload){
      const index = this.stocks.findIndex((tag) =>{
        return tag.id === stock.id
      })
      console.log(index)
      const tag = this.stocks[index]
      this.stocks.splice(index,1,stock)
    }

    // API通信

  @Action
  async stockGet(){
    const res : Array<StockPayload>  = await axios.get('/api/inventory/stock').then((obj) => {
      return obj.data
    })
    console.log('stockGet :' +res)
    this.changeStocks(res)
  }
  @Action
  async addStock (order : AddStockPayload){
    await axios.post('/api/inventory/change', order)
    this.changeStockNum(order)
  }
  @Action
  async entryStock (order : StockPayload){
    await axios.post('/api/inventory/entry', order)
    this.entryStockExe(order)
  }
  @Action
  async deleteStock (id : number){
    await axios.post('/api/inventory/delete', id)
    this.deleteStockExe(id)
  }
  @Action
  async upDateStock (order : StockPayload){
    await axios.post('/api/inventory/update', order)
    this.upDateStockExe(order)
  }

}
  export const inventoryModule = getModule(InventoryStore);
