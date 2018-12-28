import Vue from 'vue';
import App from '@/App';
import store from '@/store';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  render: function render(h) {
    return ( 
      <App/>
    )
  }
});

