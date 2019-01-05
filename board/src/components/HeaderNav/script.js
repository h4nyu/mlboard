
export default {
  name: 'HeaderNav',
  render: function render(h) {
    return (
      <div class="navbar is-dark">
        <div class="navbar-brand">
          <span class="navbar-item">
            OnikuBoard
          </span>
          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      </div>
    )
  }
};
