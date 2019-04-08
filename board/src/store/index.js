import Vuex from 'vuex';
import Vue from 'vue';
import * as experimentStore from './experimentStore';
import * as appStore from './appStore';

Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    [experimentStore.namespace]: experimentStore.store,
    [appStore.namespace]: appStore.store,
  },
});
