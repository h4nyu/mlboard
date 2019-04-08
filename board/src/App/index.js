import { mapState, mapActions, mapGetters } from 'vuex';
import HeaderNav from '@/components/HeaderNav';
import SideNav from '@/components/SideNav';
import Loading from '@/components/Loading';
import Layout from '@/components/Layout';
import '@/styles/theme.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import * as appStore from "@/store/appStore";

import Vue from 'vue';

export default {
  name: 'App',
  mounted() {
    this.$store.dispatch(appStore.actionTypes.FETCH_ALL);
  },
  render() {
    return (
      <Layout>
        <HeaderNav slot="header" />
        <router-view slot="main" />
        <Loading />
      </Layout>
    );
  },
};
