import React, { FormEvent } from 'react'
import CopyChamberList from '~/connectors/CopyChamberList';
import styled from 'styled-components'
import fp from "lodash/fp"
import _ from "lodash"
import {
  IChamber,
} from '~/core/models'


const Layout = styled.div`
  display: flex
  flex-direction: column;
  height: 100%;
`

export interface IProps {
  chamberSet: {[id: string]: IChamber}
  soruceIds: string[]
  onCopy: () => void
}
export default class MaintenanceCopyForm extends React.Component<IProps> {
  render = () => {
    const {
      chamberSet,
      soruceIds,
      onCopy,
    } = this.props
    const chamberKeys:string[] = Object.keys(chamberSet)
    const unSelctedIds:string[] = _.difference(chamberKeys, soruceIds)
    const copyChamberSet = fp.pickBy((x:IChamber) => unSelctedIds.includes(x.id))(chamberSet)

    return (
      <Layout>
        <div className="field">
          <CopyChamberList
            chamberSet={copyChamberSet}
          />
        </div>
        <div className="buttons is-right">
          <div className="button is-info" onClick={onCopy}>
            <span className="icon">
              <i className="fa fa-save"></i>
            </span>
            <span>実行</span>
          </div>
        </div>
      </Layout>
    )
  }
}
