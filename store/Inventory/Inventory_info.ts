import { VuexModule, Module, Mutation, getModule, Action } from 'vuex-module-decorators'
import store from "~/store/store";
import axios from '@/plugins/axios'
import TestRes from '~/data/TestRes';
import { TestReq } from '~/data/TestReq';

export interface ISampleState {
  param1 :string;}

  @Module({dynamic: true, store, namespaced: true, name: 'sampleStore' })
class Sample extends VuexModule implements ISampleState {
  param1 = '';

  @Mutation
  addPost(param: string) {
    this.param1 =param
  }

  @Action
  async stock_get() : Promise<String> {
    const req : TestReq = new TestReq()
    req.name = "wataru"
    req.value = 15
    const res : TestRes  = await axios.post('/api/stock_get', req).then((obj) => {
      return obj.data
    })
    return res.test;
  }}
