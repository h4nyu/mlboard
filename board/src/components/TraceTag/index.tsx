import React from 'react'
import { ITarget, ITrace } from '~/core/models'; 
import { StatusLevel } from '~/core/enums'; 
import StatusLamp from '~/components/StatusLamp';
import uuid from 'uuid';
import styled from 'styled-components';


interface ITraceTagProps {
  target: ITarget
  trace: ITrace
  onDelete: (traceId: string) => void
}

export default class TraceTag extends React.Component<ITraceTagProps> {
  render = () => {
    return (
      <div className='control'>
        <div className='tags has-addons'>
          <span className='tag is-primary'>{this.props.target.name}</span>
          <a className='tag is-delete' onClick={() => this.props.onDelete(this.props.trace.id)}/>
        </div>
      </div>
    )
  }
}
