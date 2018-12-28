import styles from "./app.css";

export default {
  name: 'app',
  render: function render(h) {
    return (
      <div class={styles.app}>
        <div class={styles.header}>
          header
        </div>
        <div class={styles.aside}>
          aside
        </div>
        <div class={styles.main}>
          view-router
        </div>
      </div>
    )
  }
};

