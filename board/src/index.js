import Vue from 'vue';
import TheApp from '@/connectors/TheApp';
import store from '@/store';
import router from '@/router';
import { sync } from 'vuex-router-sync';

sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render() {
    return (
      <TheApp/>
    );
  },
});
