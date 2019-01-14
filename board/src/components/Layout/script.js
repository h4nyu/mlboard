export default {
  name: 'Layout',
  render: function render(h) {
    return (
      <div class="layout">
        <div class="header">
          {this.$slots.header}
        </div>
        <div class="aside">
          {this.$slots.aside}
        </div>
        <div class="main">
          {this.$slots.main}
        </div>
        {this.$slots.default}
      </div>
    )
  },
};
