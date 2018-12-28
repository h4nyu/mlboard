import styles from "./style.css";
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'app',
  computed:{
    ...mapState('app', [
      "message"
    ]),
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
          view-router
        </div>
      </div>
    )
  }
};


