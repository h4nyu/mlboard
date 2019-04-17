import App from '@/containers/App';
import { mapState, mapActions } from 'vuex';
import * as appStore from '@/store/appStore';
import store from '@/store';
import router from '@/router';
import { sync } from 'vuex-router-sync';

sync(store, router);

export default {
  name: 'TheApp',
  store,
  router,
  computed: {
    ...mapState({
    }),
  },
  methods: {
    ...mapActions({
      init: appStore.actionTypes.FETCH_ALL,
    }),
  },
  render(h) {
    return (
      <App
        vOn:init={this.init}
      />
    );
  },
};
