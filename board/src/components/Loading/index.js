import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Loading',
  props: {
    pendingNum: {
      type: Number,
    },
  },
  computed: {
    isActive() {
      return this.pendingNum > 0;
    },
  },
  render: function render(h) {
    return (
      <Loading active={this.isActive} width={150} height={150} />
    );
  },
};
