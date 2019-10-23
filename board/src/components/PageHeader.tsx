import styled from 'styled-components';
import React from 'react';


const Brand = styled.span`
  font-family: Impact;
  font-size: 26px;
`;
export default class PageHeader extends React.Component<{}, {}> {
  getMenuClassName() {
    return 'navbar-burger burger';
  }

  render = () => {
    return (
      <div className="navbar is-primary" style={{zIndex: 30}}>
        <div className="navbar-brand">
          <Brand className="navbar-item"> 
            MLBOARD
          </Brand>

          <a role="button"
            className={this.getMenuClassName()}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className='navbar-menu'>
          <div className="navbar-start">
          </div>
        </div>
      </div>
    );
  }
}

