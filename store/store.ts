import Vue from "vue";
import Vuex from "vuex";
import { ISampleState } from "./sample/Sample";
Vue.use(Vuex);

export interface State {
  sample: ISampleState;
}
export default new Vuex.Store<State>({});

