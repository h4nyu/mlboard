export default {
  name: 'DragBar',
  data(){
    return {
      leftWidth: null,
      isDragging: false,
    }
  },
  computed:{
    barWidth(){
      return this.$refs.bar.offsetWidth;
    },
    leftChildWidth(){
      return this.$slots.left[0].elm.clientWidth;
    },
  },
  methods:{
    doDrag(e){
      if(this.isDragging){
        const leftWidth = (e.pageX - this.barWidth / 2);
        if (this.leftChildWidth <= leftWidth){
          this.leftWidth = leftWidth;
        }
      }
    },
    startDrag(){
      this.isDragging = true;
    },
    endDrag(){
      this.isDragging = false;
    },
  },
  render: function render(h) {
    return (
      <div class="drag-container" vOn:mouseup={this.endDrag} vOn:mousemove={this.doDrag}>
        <div ref="left" style={{width: `${this.leftWidth}px`}}>
          {this.$slots.left}
        </div>
        <div 
          class="dragbar" 
          id="dragbar" 
          ref='bar' 
          vOn:mousedown={this.startDrag} 
          >
        </div>
        <div class="right">
          {this.$slots.right}
        </div>
      </div>
    )
  }
};
