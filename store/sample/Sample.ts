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

  // API呼び出しのサンプルメソッド
  @Action
  async loadTest() : Promise<String> {
    const res : TestRes  = await axios.get('/api/test').then((obj) => {
      return obj.data
    })
    return res.test;
  }

  @Action
  async postTest() : Promise<String> {
    const req : TestReq = new TestReq()
    req.name = "wataru"
    req.value = 15
    const res : TestRes  = await axios.post('/api/test', req).then((obj) => {
      return obj.data
    })
    return res.test;
  }

  @Action
  async loadPosts() {
    const posts = await fetchPosts()
    posts.forEach(post => {
      this.addPost(post.param1)
    })
  }
}

// この関数はあくまでも非同期にデータを取ってくるしくみ紹介
const fetchPosts = (): Promise<ISampleState[]> => {
  return new Promise(resolve => {
    const dummys: ISampleState[] = [
      {
        param1: "1"
      },
      {
        param1: "2"

      },
      {
        param1: "3"
      }
    ]
    resolve(dummys)
  })
}

// 外部利用するためにgetModuleを使う
export const sampleModule = getModule(Sample);
