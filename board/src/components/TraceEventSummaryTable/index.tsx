import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import uuid from "uuid"
import fp from "lodash/fp"
import { 
  ITraceEvent, 
  IChamber,
  ITarget,  
  ITraceLevel
} from '~/core/models'
import RangeDatetimeInput from '~/components/RangeDatetimeInput'
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


interface IEventSummary {
  chamberName: string
  blockName: string
  statusLabel: string 
  name: string 
  count: number
}

interface ITraceEventSummaryTableProps {
  traceEventSet: {[id:string]:ITraceEvent}
  chamberSet: {[id: string]: IChamber}
  targetSet: {[id: string]: ITarget}
  fromDate:string
  toDate:string
  onFromDateChange : (datetime:string) => void
  onToDateChange : (datetime:string) => void
  onRangeChange: (fromDate:string, toDate:string) => void
}

export default class TraceEventSummaryTable extends React.Component<ITraceEventSummaryTableProps> {

  columns = [
    'ブロック',
    'チャンバー',
    '種別',
    '名称',
    '発生回数',
  ]

  getHumanDate(date:string) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }

  getRows = () => {
    const {traceEventSet, chamberSet, targetSet} = this.props
    const rows: IEventSummary[] = fp.pipe(
      fp.toArray(),
      fp.groupBy((x: ITraceEvent) => `${x.configId}-${x.name}`),
      fp.map((x: ITraceEvent[]) => {
        const traceEvent = x[0];
        const target = targetSet[traceEvent.configId];
        const chamber = chamberSet[target.chamberId];
        return {
          chamberName: chamber.name,
          blockName: chamber.blockName,
          statusLabel: traceEvent.name,
          name: target.name,
          count:x.length
        };
      }),
      fp.sortBy((x:IEventSummary) => moment(x.count)),
      fp.reverse,
    )(traceEventSet)
    return rows
  }


  render = () => {
    const {
      traceEventSet, 
      chamberSet,  
      targetSet,  
      fromDate, 
      toDate, 
      onFromDateChange,
      onToDateChange,
      onRangeChange,
    } = this.props
    const rows = this.getRows()
    const {columns} = this

    return (
      <Layout>
        <HeaderArea>
          <p className="card-header-title">
            集計
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
                    <td> { x.count } </td>
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
