export default {
  name: 'HeaderNav',
  data(){
    return {
      tabStyle: {
        'navbar-item': true,
        'is-tab':true,
      }
    }
  },
  mounted(){
    console.log(this.$route);
  },
  render: function render(h) {
    return (
      <nav class="navbar is-dark">
        <div class="navbar-brand">
          <a class="navbar-item">
            OnikuBoard
          </a>
          <a role="button" class="navbar-burger burger" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start">
            <a class={ {...this.tabStyle, "is-active": this.$route.name === "TracePage"}}>
              Traces
            </a>
            <a class={ {...this.tabStyle, "is-active": this.$route.name === "ImagePage"}}>
              Images
            </a>
          </div>
        </div>
      </nav>
    )
  }
};
