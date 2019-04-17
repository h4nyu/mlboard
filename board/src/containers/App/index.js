import { mapState, mapActions, mapGetters } from 'vuex';
import TheLoading from '@/components/Loading';
import '@/styles/theme.scss';
import '@fortawesome/fontawesome-free/css/all.css';

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
