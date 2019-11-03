import { VuexModule, Module, Mutation, getModule, Action } from 'vuex-module-decorators'
import store from "~/store/store";
import axios from '@/plugins/axios'
import TestRes from '~/data/TestRes';
import { TestReq } from '~/data/TestReq';
import Stock from '~/data/Stock';

export interface ISampleState {
  param1 :string;
}

  @Module({dynamic: true, store, namespaced: true, name: 'sampleStore' })
  class InventoryStore extends VuexModule implements ISampleState {
    param1 = '';

    @Mutation
    addPost(param: string) {
      this.param1 =param
    }

  @Action
  async stockGet() : Promise<Array<Stock>> {
    const res : Array<Stock>  = await axios.get('/api/inventory/stock').then((obj) => {
      return obj.data
    })
    return res;
  }
  }


  export const inventoryModule = getModule(InventoryStore);
