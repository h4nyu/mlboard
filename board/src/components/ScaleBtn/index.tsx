import React, {Component} from 'react'
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`

interface IScaleBtnProps {
  onPlusClick: () => void 
  onMinasClick: () => void 
}

export default class ScaleBtn extends React.Component<IScaleBtnProps> {
  render = () => {
    return (
      <Layout>
        <div className="button is-small" onClick={this.props.onPlusClick}>
          <span className="icon">
            <i className="fa fa-plus"></i>
          </span>
        </div>
        <div className="button is-small" onClick={this.props.onMinasClick}>
          <span className="icon">
            <i className="fa fa-minus"></i>
          </span>
        </div>
      </Layout>
    )
  }
}
