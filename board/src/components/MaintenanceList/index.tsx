import React from 'react'
import styled from 'styled-components'
import { StatusLevel } from '~/core/enums'
import {IProps as IItemProps} from '~/connectors/MaintenanceListItem'
import fp from 'lodash/fp'
import {
  IMaintenance,
  IChamber,
  ITraceLevel,
  IMaintenanceLog,
} from '~/core/models'

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "header plus"
    "content content";
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr auto;
`

const HeaderArea = styled.div`
  grid-area: header;
`
const ContentArea = styled.div`
  grid-area: content;
`
const BtnArea = styled.div`
  display: flex;
  grid-area: plus;
  align-items: center;
`

interface IMaintenanceListProps {
  chamberIds: string[]
  maintenanceSet: {[id: string]: IMaintenance}
  Child: React.FC<IItemProps>
  onAdd: () => void
  onCopy: () => void
}

export default class MaintenanceList extends React.Component<IMaintenanceListProps> {
  getItems = ():IMaintenance[] => {
    const {maintenanceSet, chamberIds} = this.props
    const maintenances = fp.toArray(maintenanceSet)
    const rows = fp.flow(
      fp.filter((x:IMaintenance) => chamberIds.includes(x.chamberId)),
      fp.sortBy(x => -x.value),
      fp.sortBy(x => -x.status),
    )(maintenances)
    return rows
  }

  render = () => {
    const {
      Child,
      onAdd,
      onCopy,
    } = this.props
    return (
      <Layout className={'card'}>
        <HeaderArea>
          <p className="card-header-title">
            メンテナンス
          </p>
        </HeaderArea>
        <BtnArea>
          <a className="button" onClick={onCopy}>
            copy
          </a>
          <a className="button is-white" onClick={onAdd}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </a>
        </BtnArea>
        <ContentArea>
          {
            this.getItems().map((x: IMaintenance) => {
              return (
                <Child
                  key={x.id}
                  maintenance={x}
                />
              )
            })
          }
        </ContentArea>
      </Layout>
    )
  }
}

