import { VuexModule, Module, Mutation, getModule, Action } from 'vuex-module-decorators'
import store from "~/store/store";
import axios from '@/plugins/axios'
import TestRes from '~/data/TestRes';
import { TestReq } from '~/data/TestReq';
import Stock from '~/data/Stock';
import { ChangeReq } from '~/data/ChangeReq';
import { tsParameterProperty, objectExpression } from '@babel/types';
import AddStockPayload from '@/data/AddStockPayload'

export interface InventoryState {
   stocks:Array<Stock>;
}

  @Module({dynamic: true, store, namespaced: true, name: 'InventoryStore' })
  class InventoryStore extends VuexModule implements InventoryState {
    stocks = [new Stock()];

    // @Mutation
    // addPost(param: string) {
    //   this.param1 =param
    // }

    @Mutation
    changeStocks(param: Array<Stock>) {
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
    }

    @Mutation
    deleteStockExe(ids :number){

    }

  @Action
  async stockGet(){
    const res : Array<Stock>  = await axios.get('/api/inventory/stock').then((obj) => {
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
  async deleteStock (id : number){
    const request = new ChangeReq()
    request.id = id
    await axios.post('/api/inventory/delete', request)
    this.deleteStockExe(id)
  }

  }


  export const inventoryModule = getModule(InventoryStore);
