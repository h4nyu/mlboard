import React, { FormEvent } from 'react'
import styled from 'styled-components'
import {
  ITraceLevel,
} from '~/core/models'



export interface IProps {
  id: string | undefined
  warningLevel: number
  errorLevel: number
  onWarningInput: (value: number) => void
  onErrorInput: (value: number) => void
  onSave: () => void
  onDeleteOne: (id:string) => void
}
export default class TraceLevelForm extends React.Component<IProps> {
  static defaultProps = {
    warningLevel: 0,
    errorLevel: 0
  }

  render = () => {
    const {
      id,
      errorLevel, 
      warningLevel,
      onWarningInput,
      onErrorInput,
      onSave,
      onDeleteOne,
    } = this.props
return (
      <div>
        <div className="field">
          <label className="label">
            <span className="has-text-warning">
              <i className="fas fa-circle"></i>
            </span>
            警告値
          </label>
          <div className="control">
            <input
              className="input"
              value={warningLevel}
              onChange={(e: FormEvent<HTMLInputElement>) => onWarningInput(Number(e.currentTarget.value))}
              type="number">
            </input>
          </div>
        </div>
        <div className="field">
          <label className="label">
            <span className="has-text-danger">
              <i className="fas fa-circle"></i>
            </span>
            警報値
          </label>
          <div className="control">
            <input
              className="input"
              value={errorLevel}
              onChange={(e: FormEvent<HTMLInputElement>) => onErrorInput(Number(e.currentTarget.value))}
              type="number">
            </input>
          </div>
        </div>
        <div className="buttons is-right">
          <div className="button is-info" onClick={onSave}>
            <span className="icon">
              <i className="fa fa-save"></i>
            </span>
            <span>保存</span>
          </div>

          <div className="button is-danger" onClick={() => onDeleteOne(id!)}>
            <span className="icon">
              <i className="far fa-trash-alt"></i>
            </span>
            <span>削除</span>
          </div>
        </div>
      </div>
    )
  }
}
