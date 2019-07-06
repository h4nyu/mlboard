import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import uuid from "uuid"
import fp from "lodash/fp"
import RangeDatetimeInput from '~/components/RangeDatetimeInput'
import { 
  ITraceEvent, 
  IChamber,
  ITarget,  
  ITraceLevel
} from '~/core/models'
import { StatusLevel } from '~/core/enums'; 

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "header search" 
    "content content";
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  height: 100%;
`

const HeaderArea = styled.div`
  grid-area: header;
`

const SearchArea = styled.div`
  grid-area: search;
  display: flex;
  align-items: center;
`


const ContentArea = styled.div`
  grid-area: content;
  overflow-y: scroll;
`

interface IEventHistory {
  chamberName: string
  blockName: string 
  statusLabel: string 
  name: string 
  occurredDate:string
}


interface ITraceEventHistoryTableProps {
  traceEventSet: {[id:string]:ITraceEvent}
  chamberSet: {[id: string]: IChamber}
  targetSet: {[id: string]: ITarget}
  fromDate:string
  toDate:string
  onFromDateChange : (datetime:string) => void
  onToDateChange : (datetime:string) => void
  onRangeChange: (fromDate:string, toDate:string) => void
  onDateClick: (datetime:string) => void
}

export default class TraceEventHistoryTable extends React.Component<ITraceEventHistoryTableProps> {
  columns = [
    'ブロック',
    'チャンバー',
    '種別',
    '系列',
    '発生日時',
  ]
  getHumanDate(date:string) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }

  getRows = () => {
    const {traceEventSet, chamberSet, targetSet} = this.props
    const rows: IEventHistory[] = fp.pipe(
      fp.toArray(),
      fp.map((x: ITraceEvent) => {
        const traceEvent = x;
        const target = targetSet[traceEvent.configId];
        const chamber = chamberSet[target.chamberId];
        return {
          chamberName: chamber.name,
          blockName: chamber.blockName,
          statusLabel: x.name,
          name: target.name,
          occurredDate:this.getHumanDate(traceEvent.occurredDate),
        };
      }),
      fp.sortBy((x:ITraceEvent) => moment(x.occurredDate)),
      fp.reverse,
    )(traceEventSet)
    return rows
  }

  render = () => {
    const {columns} = this
    const {
      traceEventSet, 
      fromDate, 
      toDate, 
      onFromDateChange,
      onToDateChange,
      onRangeChange,
      onDateClick,
    } = this.props
    const rows =  this.getRows()

    return (
      <Layout>
        <HeaderArea>
          <p className="card-header-title">
            履歴
          </p>
        </HeaderArea>
        <SearchArea>
          <RangeDatetimeInput
            toDate={toDate}
            fromDate={fromDate}
            onFromDateChange={onFromDateChange}
            onToDateChange={onToDateChange}
            onSubmit={onRangeChange}
          />
        </SearchArea>
        <ContentArea>
          <table className= {'table is-bordered is-fullwidth'}>
            <thead>
              <tr>
                {
                  columns.map(x => <th key={uuid()}>{x}</th>)
                }
              </tr>
            </thead>
            <tbody>
              {
                rows.map(x => (
                  <tr key={uuid()}>
                    <td> { x.blockName } </td>
                    <td> { x.chamberName } </td>
                    <td> { x.statusLabel } </td>
                    <td> { x.name } </td>
                    <td> 
                      <a 
                        className="button" 
                        href="#/trace/transition"
                        onClick={() => onDateClick(x.occurredDate)}
                      > 
                        { x.occurredDate } 
                      </a>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </ContentArea>
      </Layout>
    )
  }
}


