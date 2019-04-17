import PACKAGE from 'package.json';

export default {
  name: 'HeaderNav',
  props: {
    name: {
      type: String,
    },
  },
  computed: {
    version() {
      return PACKAGE.version;
    },
    menuStyle() {
      return [
        'navbar-menu',
      ];
    },
    tabStyle() {
      return [
        'is-active',
      ];
    },
  },
  methods: {
    getTabStyle({ name }) {
      const baseStyle = [
        'navbar-item',
        'is-tab',
      ];
      if (this.name === name) {
        baseStyle.push(
          'is-active',
        );
      }
      return baseStyle;
    },
    handleRefreshClick() {
      this.$emit('reflesh', {});
    },
  },
  render: function render(h) {
    return (
      <nav class="navbar is-dark">
        <div class="navbar-brand">
          <a class="navbar-item"> MLBoard v{this.version} </a>
        </div>
        <div class={this.menuStyle}>
          <div class="navbar-start">
            <a class={this.getTabStyle({ name: 'TracePage' })} href="#/">
              Traces
            </a>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-light" vOn:click={this.handleRefreshClick}>
                <span>
                  <i class="fas fa-sync-alt"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  },
};
