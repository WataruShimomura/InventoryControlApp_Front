import { VuexModule, Module, Mutation, getModule, Action } from 'vuex-module-decorators'
import store from "~/store/store";
import axios from '@/plugins/axios'

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
    const res : String  = await axios.get('/api/test').then((obj) => {
      console.log('test = '+ obj.data.test)
      return obj.data.test
    })
    return res;
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
