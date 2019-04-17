import Vue from 'vue';
import TheApp from '@/connectors/TheApp';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render() {
    return (
      <TheApp/>
    );
  },
});
