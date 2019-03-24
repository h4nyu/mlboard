export default {
  name: 'Layout',
  data() {
    return {
      leftWidth: null,
      isDragging: false,
    };
  },
  computed: {
    barWidth() {
      return this.$refs.bar.offsetWidth;
    },
    asideWidth() {
      return this.$slots.aside[0].elm.clientWidth;
    },
  },
  methods: {
    doDrag(e) {
      if (this.isDragging) {
        const leftWidth = (e.pageX - this.barWidth / 2);
        if (this.asideWidth <= leftWidth) {
          this.leftWidth = leftWidth;
        }
      }
    },
    startDrag() {
      this.isDragging = true;
    },
    endDrag() {
      this.isDragging = false;
    },
  },
  render() {
    return (
      <div class="layout" vOn:mouseup={this.endDrag} vOn:mousemove={this.doDrag}>
        <div class="header">
          {this.$slots.header}
        </div>
        <div class="aside" ref="aside" style={{ width: `${this.leftWidth}px` }}>
          {this.$slots.aside}
        </div>
        <div
          class="dragbar"
          ref='bar'
          vOn:mousedown={this.startDrag}
        >
        </div>
        <div class="main">
          {this.$slots.main}
        </div>
        {this.$slots.default}
      </div>
    );
  },
};
