export default {
  name: 'HeaderNav',
  data(){
    return {
      tabStyle: {
        'navbar-item': true,
        'is-tab':true,
      },
      menuStyle:{
        "navbar-menu": true,
      },
      toggle: false,
    }
  },
  methods: {
    handleBuarger(){
      this.toggle = !this.toggle;
    }
  },
  render: function render(h) {
    return (
      <nav class="navbar is-dark">
        <div class="navbar-brand">
          <a class="navbar-item">
            MLBoard
          </a>
          <a role="button" class="navbar-burger burger" data-target="navbarBasicExample" vOn:click={this.handleBuarger}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class={{...this.menuStyle, "is-active": this.toggle}}>
          <div class="navbar-start">
            <a class={{...this.tabStyle, "is-active": this.$route.name === "TracePage"}}>
              Traces
            </a>
          </div>
        </div>
      </nav>
    )
  }
};
