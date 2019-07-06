import React from 'react'
import { IMaintenanceLog } from '~/core/models'; 
import MaintenanceLog from '~/components/MaintenanceLog'
import DatetimeInput from '~/components/DatetimeInput'
import * as d3 from 'd3';
import styled from 'styled-components';
import moment from 'moment';
import _ from 'lodash';
import fp from "lodash/fp"

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "header"
    "content";
  padding: 0.5em;
  height: 100%;
`
const HeaderArea = styled.div`
  grid-area: header;
  padding: 0.5em;
`

const ContentArea = styled.div`
  grid-area: content;
  padding: 0.5em;
  overflow-y: scroll;
`

interface IMaintenanceLogListProps {
  maintenanceLogSet: {[id: string]: IMaintenanceLog}
  maintenanceId: string | undefined
  occurredDate: string
  onOccuredDateChange: (datetime:string) => void
  onDelete: (id:string) => void
  onAdd: () => void
}

export default class MaintenanceLogList extends React.Component<IMaintenanceLogListProps> {

  getItems = ():IMaintenanceLog[] => {
    const {maintenanceLogSet, maintenanceId} = this.props
    const items = fp.pipe(
      fp.toArray(),
      fp.filter((x: IMaintenanceLog) => x.maintenanceId === maintenanceId),
      fp.sortBy((x: IMaintenanceLog) => - moment(x.occurredDate))
    )(maintenanceLogSet)
    return items
  }

  render = () => {
    const { 
      occurredDate,
      onAdd,
      onOccuredDateChange,
    } = this.props

    return (
      <Layout className='card'>
        <HeaderArea>
          <DatetimeInput 
            onSubmit={onAdd} 
            onChange={onOccuredDateChange}
            value={occurredDate}
          />
        </HeaderArea>
        <ContentArea>
          {
            this.getItems().map(x => (
              <MaintenanceLog
                key={x.id}
                maintenanceLog={x}
                onDelete={this.props.onDelete}
              />
            ))
          }
        </ContentArea>
      </Layout>
    )
  }
}

