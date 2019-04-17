import { mapState, mapActions, mapGetters } from 'vuex';
import HeaderNav from '@/components/HeaderNav';
import * as appStore from '@/store/appStore';

export default {
  name: 'TheHeaderNav',
  computed: {
    ...mapState({
      name: state => state.route.name,
    }),
  },
  methods: {
    ...mapActions({
      reflesh: appStore.actionTypes.FETCH_ALL,
    }),
  },
  render(h) {
    return (
      <HeaderNav
        name={this.name}
        vOn:reflesh={this.reflesh}
      />
    );
  },
};
