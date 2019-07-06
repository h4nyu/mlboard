import React from 'react'
import styled, {keyframes} from 'styled-components'
import Overlay from '~/components/Overlay'
import MDSpinner from "react-md-spinner";

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 10px solid white;
  border-top: 10px solid #161616; 
  border-radius: 70%;
  width: 30%;
  height: 30%;
  animation: ${rotate} 1s linear infinite;
`

export interface ILoadingProps {
  pendingNum: number
}
export default class Loading extends React.Component<ILoadingProps> {
  getIsActive = () => {
    const {pendingNum} = this.props
    return pendingNum > 0
  }
  render = () => {
    const isActive = this.getIsActive()
    return (
      <Overlay isActive={isActive}>
        <MDSpinner 
          singleColor={"white"} 
          size={200}
          borderSize={10}
        />
      </Overlay>
    )
  }
}


          // <i className="fas fa-spinner fa-pulse"></i>
