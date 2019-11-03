import { VuexModule, Module, Mutation, getModule, Action } from 'vuex-module-decorators'
import store from "~/store/store";
import axios from '@/plugins/axios'
import TestRes from '~/data/TestRes';
import { TestReq } from '~/data/TestReq';
import Stock from '~/data/Stock';
import ChangeReq from '~/data/ChangeReq';

export interface InventoryState {
   stocks:Array<Stock>;
}

  @Module({dynamic: true, store, namespaced: true, name: 'sampleStore' })
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
    changeStockNum(id :number, addNum : number){
      // stocksの、対象となるidのオブジェクトを取得する
      // そいつのstockNumを加算する
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
  async plus1Stock(id : number){
    const request = new ChangeReq()
    request.id = id
    request.sumValue = 1
    await axios.post('/api/inventory/change', request)
    this.changeStockNum(id, 1)

  }

  }


  export const inventoryModule = getModule(InventoryStore);
