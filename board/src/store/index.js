import Vuex from 'vuex';
import Vue from 'vue';
import * as modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules,
});

