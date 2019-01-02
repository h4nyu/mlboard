import styles from '@/App/style.scss'

export default {
  name: 'HeaderNav',
  render: function render(h) {
    return (
      <div class={[styles['navbar'], styles['is-dark']]}>
        <div class={styles["navbar-brand"]}>
          <span class={styles["navbar-item"]}>
            OnikuBoard
          </span>
        </div>
      </div>
    )
  }
};
