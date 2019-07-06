import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import fp from "lodash/fp"
import CsvSaveBtn from "~/components/CsvSaveBtn"
import RangeDatetimeInput from '~/components/RangeDatetimeInput'
import { IEventSection, IChamber } from '~/core/models'
import { StatusLevel } from '~/core/enums'; 
import uuid from 'uuid'

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "header search" 
    "btn btn"
    "content content";
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto 1fr;
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

const BtnArea = styled.div`
  grid-area: btn;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const ContentArea = styled.div`
  grid-area: content;
  overflow-y: scroll;
`

interface IEventSummary {
  blockName: string
  chamberName: string
  statusLabel: string
  code: number
  message: string
  count: number
}
const TableBody = (props: {rows:IEventSummary[]}) => (
  <tbody>
    {
      props.rows.map(x => (
        <tr key={uuid()}>
          <td> { x.blockName } </td>
          <td> { x.chamberName } </td>
          <td> { x.statusLabel } </td>
          <td> { x.code } </td>
          <td> { x.message } </td>
          <td> { x.count } </td>
        </tr>
      ))
    }
  </tbody>
)

const TableHeader = (props: {columns:string[]}) => (
  <thead>
    <tr>
      {
        props.columns.map(x => (
          <th key={uuid()}>{x}</th>
        ))
      }
    </tr>
  </thead>
)


interface IEventSummaryTableProps {
  eventSectionSet: {[id: string]: IEventSection}
  chamberSet: {[id: string]: IChamber}
  fromDate:string
  toDate:string
  onRangeChange: (fromDate:string, toDate:string) => void
  onFileSave: (fname: string, rows:string[][], columns: string[]) => void
  onFromDateChange: (datetime: string) => void
  onToDateChange: (datetime: string) => void
}
export default class EventSummaryTable extends React.Component<IEventSummaryTableProps> {
  getStatusLabel(status:number) {
    if(status === StatusLevel.CRITICAL){
      return 'Alm'
    }else if(status === StatusLevel.HARD_WARNING){
      return 'Wrn'
    }
    return ""
  }
  columns = [
    'ブロック',
    'チャンバー',
    '種別',
    'エラーコード',
    'エラー名称',
    '発生回数',
  ]

  getRows = () => {
    const {chamberSet, eventSectionSet} = this.props
    const rows: IEventSummary[] = fp.pipe(
      fp.toArray(),
      fp.groupBy((x: IEventSection) => `${x.chamberId}-${x.code}`),
      fp.map((x:IEventSection[]):IEventSummary => {
        const eventSection = x[0];
        const chamber = chamberSet[eventSection.chamberId];
        return {
          chamberName: chamber.name,
          blockName: chamber.blockName,
          statusLabel: this.getStatusLabel(eventSection.status),
          code: eventSection.code,
          message: eventSection.message,
          count: x.length,
        };
      }),
      fp.sortBy((x:IEventSummary) => x.count),
      fp.reverse,
    )(eventSectionSet)
    return rows
  }

  handleSaveFile = () => {
    const {fromDate, toDate, onFileSave} = this.props
    const {columns} = this
    const rows = this.getRows()
    const fmt = 'YYYYMMDD';
    const fmtFromDate = moment(fromDate).format(fmt);
    const fmtToDate = moment(toDate).format(fmt);
    onFileSave(
      `summary_${fmtFromDate}_${fmtToDate}.csv`,
      rows.map(fp.toArray),
      columns,
    )
  }

  render = () => {
    const {
      chamberSet, 
      eventSectionSet, 
      fromDate, 
      toDate, 
      onRangeChange,
      onFromDateChange,
      onToDateChange,
    } = this.props
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
        <BtnArea className='card'>
          <div className="button" onClick={this.handleSaveFile}>
            <i className="fas fa-file-download"></i>
          </div>
        </BtnArea>
        <ContentArea>
          <table className= {'table is-bordered is-fullwidth'}>
            <TableHeader columns={columns} />
            <TableBody rows={this.getRows()} />
          </table>
        </ContentArea>
      </Layout>
    )
  }
}

