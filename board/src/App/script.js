import { mapState, mapActions, mapGetters } from 'vuex';
import HeaderNav from '@/components/HeaderNav'
import SideNav from '@/components/SideNav'
import PlotlyPlot from '@/components/PlotlyPlot'
import Loading from '@/components/Loading'

export default {
  name: 'app',
  mounted: function () {
    this.$store.dispatch('app/FETCH', {}, {root: true});
  },
  render: function render(h) {
    return (
      <div class="app">
        <div class="header">
          <HeaderNav/>
        </div>
        <div class="aside card">
          <SideNav/>
        </div>
        <div class="main card">
          <router-view></router-view>
        </div>
        <Loading />
      </div>
    )
  }
};



