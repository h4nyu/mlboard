import React from 'react'
import PACKAGE from 'package.json';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { match } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps<any> {
  onReflesh: () => void
  onRouteChange: (match:match) => void
}
class HeaderNav extends React.Component<IProps, {}> {
  getMenuClassName() {
    return 'navbar-burger burger'
  }

  componentDidMount = () =>{
    const { history, onRouteChange, match } = this.props
    onRouteChange(match)
  }

  render = () => {
    return (
      <div className="navbar is-dark" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item"> 
            MLBoard v.{PACKAGE.version} 
          </a>

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
            <div className="navbar-item has-dropdown is-hoverable is-dark">
              <a className="navbar-link">
                Trace
              </a>
              <div className="navbar-dropdown">
                <a className="navbar-item" href="#/trace/transition">
                  推移
                </a>
                <a className="navbar-item" href="#/trace/multi">
                  多系列
                </a>
                <a className="navbar-item" href="#/trace/correlation">
                  相間
                </a>
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable is-dark">
              <a className="navbar-link">
                Event
              </a>
              <div className="navbar-dropdown">
                <a className="navbar-item" href="#/event/history">
                  履歴
                </a>
                <a className="navbar-item" href="#/event/summary">
                  集計
                </a>
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable is-dark">
              <a className="navbar-link">
                TraceEvent
              </a>
              <div className="navbar-dropdown">
                <a className="navbar-item" href="#/trace-event/history">
                  履歴
                </a>
                <a className="navbar-item" href="#/trace-event/summary">
                  集計
                </a>
              </div>
            </div>
            <a className="navbar-item" href="#/maintenance">Maintenance</a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-light" onClick={this.props.onReflesh}>
                  <span>
                    <i className="fas fa-sync-alt"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(HeaderNav)
