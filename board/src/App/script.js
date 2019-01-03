import { mapState, mapActions, mapGetters } from 'vuex';
import HeaderNav from '@/components/HeaderNav'
import SideNav from '@/components/SideNav'

export default {
  name: 'app',
  mounted: function () {
    this.$store.dispatch('app/FETCH', {}, {root: true});
    console.log(this)

  },
  render: function render(h) {
    return (
      <div class="app">
        <div class="header">
          <HeaderNav/>
        </div>
        <div class="aside">
          <SideNav />
        </div>
        <div class="main">
          <router-view></router-view>
        </div>
      </div>
    )
  }
};


