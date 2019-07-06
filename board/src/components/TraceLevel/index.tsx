import React from 'react'
import { ITraceLevel } from '~/core/models'


interface ITraceLevelProps {
  traceLevel: ITraceLevel
}

export default class TraceLevel extends React.Component<ITraceLevelProps> {
  render = () => {
    return (
      <div>
        <div className="title is-7 is-marginless">
          <span className="has-text-warning">
            <i className="fas fa-circle"></i>
          </span>警告値:{this.props.traceLevel.warningLevel}
        </div>
        <div className="title is-7 is-marginless">
          <span className="has-text-danger">
            <i className="fas fa-circle"></i>
          </span>警報値:{this.props.traceLevel.errorLevel}
        </div>
      </div>
    )
  }
}

