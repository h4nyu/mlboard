import React from 'react';
import Overlay from '~/components/Overlay';
import MDSpinner from "react-md-spinner";

export interface IProps {
  pendingNum: number;
}
export default class Loading extends React.Component<IProps> {
  getIsActive = () => {
    const {pendingNum} = this.props;
    return pendingNum > 0;
  }
  render = () => {
    const isActive = this.getIsActive();
    return (
      <Overlay 
        isActive={isActive}
      >
        <MDSpinner 
          singleColor={"white"} 
          size={200}
          borderSize={10}
        />
      </Overlay>
    );
  }
}
