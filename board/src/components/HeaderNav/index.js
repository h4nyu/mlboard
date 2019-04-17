import PACKAGE from 'package.json';

export default {
  name: 'HeaderNav',
  props: {
    name: {
      type: String,
    },
  },
  data(){
    return {
      menuActive: false,
    }
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
    menuToggleStyle(){
      if(this.menuActive){
        return 'is-active'
      }else{
        return "";
      }
    }
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
    toggleMenu(){
      this.menuActive = !this.menuActive;
    },
  },
  render: function render(h) {
    return (
      <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item"> MLBoard v.{this.version} </a>
          <a role="button" 
            vOn:click={this.toggleMenu}
            class={["navbar-burger", "burger", this.menuToggleStyle]} 
            aria-label="menu" 
            aria-expanded="false" 
            data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class={["navbar-menu", this.menuToggleStyle]}>
          <div class="navbar-start">
            <a class={this.getTabStyle({ name: 'TracePage' })} href="#/">
              Traces
            </a>
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
        </div>
      </nav>
    );
  },
};
