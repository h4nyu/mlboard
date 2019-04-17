import Loading from '@/components/Loading';
import { mapState } from 'vuex';
import * as loadingStore from '@/store/loadingStore';

export default {
  name: 'TheMessage',
  computed: {
    ...mapState({
      pendingNum: state => state[loadingStore.namespace].pendingNum,
    }),
  },
  render(h) {
    return (
      <Loading
        pendingNum={this.pendingNum}
      />
    );
  },
};

