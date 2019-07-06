import React from 'react'
import { TargetType } from '~/core/enums'; 

interface ITargetTagProps {
  targetType: TargetType
}
export default class TargetTag extends React.Component<ITargetTagProps> {
  getClassName(){
    const {targetType} = this.props
    if(targetType === TargetType.SENSOR){
      return "tag is-success";
    }
    else if(targetType === TargetType.PROCESS){
      return "tag is-info"
    }
  }
  render = () => {
    const {targetType} = this.props
    return (
      <span className={this.getClassName()} >
        {targetType}
      </span>
    )
  }
}

