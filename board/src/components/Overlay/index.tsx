import React from 'react'
import styled from 'styled-components'
const Overlay = styled.div`
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.3); /* Black background with opacity */
  cursor: pointer; /* Add a pointer on hover */
  align-items: center;
  justify-content: center;
  z-index:99;
`

export interface IProps {
  isActive: boolean
}
export default class Loading extends React.Component<IProps> {
  static defaultProps = {
    isActive:false
  }
  getStyle = () => {
    if(this.props.isActive){
      return {
        display: 'flex'
      }
    }else{
      return {
        display: 'none'
      }
    }
  }
  render = () => {
    const {children} = this.props
    return (
      <Overlay style={this.getStyle()}>
        {children}
      </Overlay>
    );
  }
}


