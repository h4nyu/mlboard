export default {
  name: 'app',
  data() {
    return {
      msg: 'Click to see the message'
    };
  },
  methods: {
    hello () {
      alert('This is the message')
    }
  },
  render: function render(h) {
    return (
      <span
        class={{ 'my-class-3': true }}
        style={{ cursor: 'pointer' }}
        on-click={ this.hello }
      >
        { this.msg }
      </span>
    )
  }
};

