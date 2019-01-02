import styles from "./style.css";
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'app',
  mounted: function () {
    this.$store.dispatch('app/FETCH', {}, {root: true});
  },
  render: function render(h) {
    return (
      <div class={styles.app}>
        <div class={styles.header}>
          header
        </div>
        <div class={styles.aside}>
          aside
          <p>{ this.message }</p>
        </div>
        <div class={styles.main}>
          <router-view></router-view>
        </div>
      </div>
    )
  }
};


