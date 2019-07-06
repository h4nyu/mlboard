import React, { FormEvent } from 'react'
import styled from 'styled-components'
import {
  ITraceLevel,
  IChamber
} from '~/core/models'

const PlaceHolder = styled.option`
      display: none;
`


export interface IMaintenanceFormProps {
  id: string | undefined
  chambers: IChamber[]
  onSelect: (id: string) => void
}
export default class MaintenanceForm extends React.Component<IMaintenanceFormProps> {

  getSelectElm() {
    const {chambers, onSelect} = this.props
    return chambers.map(chamber => (
      <option 
        key={chamber.id}
        value={chamber.id} 
      >
        {chamber.name}
      </option>
    ))
  }
  getLabel = () => {
    const {id, chambers} = this.props
    return chambers.find(x => x.id == id)!.name
  }

  render = () => {
    const {id, onSelect} = this.props
    return (
      <div>
        <div className="card">
          <label className="label">
            チャンバー
          </label>
          <div className="select">
            <select value={id} onChange={(e:  FormEvent<HTMLSelectElement>) => {onSelect(e.currentTarget.value)}}>
              <PlaceHolder>
                選択してください
              </PlaceHolder>
              {this.getSelectElm()}
            </select>
          </div>
          <label className="label">
            メンテナンス名
          </label>
          <input
            className="input">
          </input>
          <div className="buttons is-right">
            <div className="button is-info">
              <span className="icon">
                <i className="fa fa-save"></i>
              </span>
              <span>保存</span>
            </div>
          </div>
        </div>
        <div className="card">
          TheTraceLevelForm
        </div>
        <div className="card">
          TheMaintenanceTable
        </div>
      </div>
    )
  }
}
