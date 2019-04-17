import { mapState, mapActions, mapGetters } from 'vuex';
import HeaderNav from '@/components/HeaderNav';
import SideNav from '@/components/SideNav';
import TheLoading from '@/components/Loading';
import Layout from '@/components/Layout';
import '@/styles/theme.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import * as appStore from '@/store/appStore';

import Vue from 'vue';

export default {
  name: 'App',
  mounted() {
    this.$emit("init")
  },
  render() {
    return (
      <div>
        <router-view />
        <TheLoading />
      </div>
    );
  },
};
