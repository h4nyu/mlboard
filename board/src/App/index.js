import layout from "./layout.css";
import { mapState, mapActions, mapGetters } from 'vuex';
import HeaderNav from '@/components/HeaderNav'

export default {
  name: 'app',
  components: { HeaderNav },
  mounted: function () {
    this.$store.dispatch('app/FETCH', {}, {root: true});
  },
  render: function render(h) {
    return (
      <div class={layout.app}>
        <div class={layout.header}>
          <header-nav/>
        </div>
        <div class={layout.aside}>
          aside
          <p>{ this.message }</p>
        </div>
        <div class={layout.main}>
          <router-view></router-view>
        </div>
      </div>
    )
  }
};


