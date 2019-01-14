import { mapState, mapActions, mapGetters } from 'vuex';
import HeaderNav from '@/components/HeaderNav'
import SideNav from '@/components/SideNav'
import Loading from '@/components/Loading'
import Layout from '@/components/Layout'

export default {
  name: 'App',
  mounted: function () {
    this.$store.dispatch('app/FETCH', {}, {root: true});
  },
  render: function render(h) {
    return (
      <Layout>
        <template slot='header'>
          <HeaderNav/>
        </template>
        <template slot='aside'>
          <SideNav />
        </template>
        <template slot='main'>
          <router-view/>
        </template>
        <Loading />
      </Layout>
    )
  }
};
