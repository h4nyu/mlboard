import { mapGetters } from 'vuex';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Loading',
  computed: {
    ...mapGetters('loading', [
      'isActive',
    ]),
  },
  render: function render(h) {
    return (
      <Loading active={this.isActive} width={150} height={150} />
    );
  },
};
