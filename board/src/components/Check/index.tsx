import React from 'react'
import styled from 'styled-components'

const ToggleOn = () => (<i className="far fa-check-square"></i>)
const ToggleOff = () => (<i className="far fa-square"></i>)
const Layout = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
`
export interface ICheckProps {
  value: boolean
  onClick?: () => void
}
export default class Check extends React.Component<ICheckProps> {
  static defaultProps = {
    onClick: () => {}
  }
  render = () => {
    const {value, children} = this.props
    return (
      <Layout onClick={this.props.onClick}>
        {value ? <ToggleOn/> : <ToggleOff/>}
        {children}
      </Layout>
    );
  }
}
