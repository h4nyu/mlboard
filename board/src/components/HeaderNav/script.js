// <div class="navbar is-dark">
//   <div class="navbar-brand">
//     <span class="navbar-item">
//       OnikuBoard
//     </span>
//     <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
//       <span aria-hidden="true"></span>
//       <span aria-hidden="true"></span>
//       <span aria-hidden="true"></span>
//     </a>
//   </div>
// </div>

export default {
  name: 'HeaderNav',
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
            <a class="navbar-item">
              Traces
            </a>
          </div>
        </div>
      </nav>
    )
  }
};
