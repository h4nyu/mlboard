export default {
  name: 'PlotFrame',
  data(){
    return{
      toggleContent: true
    }
  },
  props:{
    title: String,
  },
  methods:{
    handleClose(){
      this.toggleContent = !this.toggleContent;
    }
  },
  render: function render(h) {
    let content;
    let toggleIcon;
    if(this.toggleContent){
      content = (
        <div class="card-content">
          <div style={{height: 200}}> 
            {this.$slots.default} 
          </div>
        </div>
      );
      toggleIcon = <i class="fas fa-chevron-down"></i>
    }else{
      toggleIcon = <i class="fas fa-chevron-right"></i>
    }

    return (
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {this.title}
          </p>
          <div href="#" class="card-header-icon" vOn:click={this.handleClose}>
            <span class="icon">
              {toggleIcon}
            </span>
          </div>
        </header>
          {content}
      </div>
    )
  }
};
