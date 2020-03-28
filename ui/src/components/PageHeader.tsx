import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import {HashRouter as Router, NavLink } from 'react-router-dom';

const Brand = styled.span`
  font-family: Impact;
  font-size: 1.5em;
`;

const Icon = styled.span`
  padding: 1em;
`;

interface IState {
  isActive: boolean;
}

interface IProps {
  onRefleshClick: () => void;
  Search: React.ComponentType<{}>;
}

export default class PageHeader extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isActive: false};
  }
  toggle = () => {
    this.setState({isActive: !this.state.isActive});
  }
  render = () => {
    const {onRefleshClick, Search} = this.props;
    return (
      <Router>
        <div className="navbar is-light" style={{zIndex: 30}}>
          <div className="navbar-brand">
            <Brand className="navbar-item" >
              MLBOARD
            </Brand>
            <div className="navbar-burger burger" data-target="navMenubd-example" onClick={() => this.toggle()}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={classnames("navbar-menu", this.state.isActive ? "is-active": null,)}  id="navMenubd-example">
            <div className="navbar-start">
              <NavLink className="navbar-item" activeClassName='is-active'  to='transitions'>
                <Icon className="icon is-small">
                  <i className="far fa-chart-bar"/>
                </Icon>
              </NavLink>
              <NavLink className="navbar-item" activeClassName='is-active'  to='config'>
                <Icon className="icon is-small">
                  <i className ="fas fa-cog"/>
                </Icon>
              </NavLink>
            </div>
            <div className="navbar-end">
              <a className="navbar-item" onClick={onRefleshClick}>
                <Icon className="icon is-small" >
                  <i className="fas fa-sync-alt" />
                </Icon>
              </a>
            </div>
          </div>
        </div>
      </Router>
    );
  }
};
