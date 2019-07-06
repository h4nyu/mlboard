import React from 'react'
interface IVerticalCollapseState {
  isShow: boolean
}

import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  height: 100%;
`

const Action = styled.div`
  height:100%;
  display: flex;
  align-items: center;
  background-color: #EEEEEE;
  padding: 0.5em;
  border: 1px solid #d0d0d0;
  &:hover {
    border: 1px solid #EEEEEE;
  }
`

export default class VerticalCollapse extends React.Component<{}> {
  state = {
    isShow: true
  }
  handleClick = () => {
    this.setState({ 
      isShow: !this.state.isShow
    })
  }
  render = () => {
    let ToggleIcon;
    let Content
    if (this.state.isShow) {
      ToggleIcon = <i className="fas fa-caret-left"></i>;
      Content = this.props.children
    } else {
      ToggleIcon = <i className="fas fa-caret-right"></i>;
    }
    return (
      <Layout>
        {Content}
        <Action onClick={this.handleClick}>
          {ToggleIcon}
        </Action>
      </Layout>
    );
  }
}


