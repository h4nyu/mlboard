import React, { FormEvent } from 'react'
import styled from 'styled-components'
import TraceLevelForm from '~/connectors/TraceLevelForm'
import MaintenanceLogList from '~/connectors/MaintenanceLogList'
import PullDownSelector, {IOption} from '~/components/PullDownSelector'
import Overlay from '~/components/Overlay'
import fp from 'lodash/fp'
import {
  IChamber
} from '~/core/models'


const Layout = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 80%;
  width: 80%;
` 

const MaintenanceArea = styled.div`
  padding: 1em;
  flex: 1;
` 

const TraceLevelArea = styled.div`
  padding: 1em;
  flex: 1;
` 

const LogListArea = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  flex: 1;
` 

const CloseArea = styled.div`
  display: flex;
  padding: 0.5em;
  justify-content: flex-end;
` 

export interface IProps {
  id: string | undefined
  name: string
  onNameChange: (text: string) => void
  chamberId: string | undefined
  isActive: boolean
  chamberSet: {[id:string]: IChamber}
  onChamberIdChange: (chamberId: string) => void
  onSave: () => void
  onClose: () => void
}
export default class MaintenanceForm extends React.Component<IProps> {
  render = () => {
    const {
      id,
      name, 
      onNameChange,
      onSave,
      onClose,
      isActive,
      chamberSet,
      chamberId,
      onChamberIdChange,
    } = this.props
    const options:IOption[] = fp.pipe(
      fp.toArray,
      fp.map((x:IChamber) => ({id: x.id, value: x.name}))
    )(chamberSet)
    return (
      <Overlay isActive={isActive}>
        <Layout>
          <CloseArea>
            <a className="delete" onClick={onClose}></a>
          </CloseArea>
          <MaintenanceArea>
            <div className="field">
              <label className="label">
                チャンバー
              </label>
              <PullDownSelector 
                selectedId={chamberId}
                options={options}
                onChange={onChamberIdChange}
                placeholder={'選択してくだい'}
              />
            </div>
            <div className="field">
              <label className="label">
                メンテナンス名
              </label>
              <div className="control">
                <input
                  className="input"
                  value={name}
                  onChange={(e: FormEvent<HTMLInputElement>) => onNameChange(e.currentTarget.value)}
                  type="text"
                >
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
            </div>
          </MaintenanceArea>

          <hr />
          <TraceLevelArea>
            {id ? <TraceLevelForm /> : null}
          </TraceLevelArea>
          <LogListArea>
            {id ? <MaintenanceLogList /> : null}
          </LogListArea>
        </Layout>
      </Overlay>
    )
  }
}
