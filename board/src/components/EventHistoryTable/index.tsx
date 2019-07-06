import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import fp from "lodash/fp"
import CsvSaveBtn from "~/components/CsvSaveBtn"
import RangeDatetimeInput from '~/components/RangeDatetimeInput'
import { IEventSection, IChamber } from '~/core/models'
import { StatusLevel } from '~/core/enums'; 
import uuid from "uuid"

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

interface IEventHistory {
  chamberName: string
  blockName: string
  statusLabel: string 
  code: number
  fromDate:string
  toDate:string
  message: string
  substractId:string 
}


interface IEventSummaryTableProps {
  eventSectionSet: {[id: string]: IEventSection}
  chamberSet: {[id: string]: IChamber}
  fromDate:string
  toDate:string
  onFileSave: (fname: string, rows:string[][], columns: string[]) => void
  onRangeChange: (fromDate:string, toDate:string) => void
  onFromDateChange: (datetime:string) => void
  onToDateChange: (datetime:string) => void
  onDateClick: (datetime:string) => void
}
export default class EventHistoryTable extends React.Component<IEventSummaryTableProps> {
  columns = [
    'ブロック',
    'チャンバー',
    '種別',
    'エラーコード',
    'エラー名称',
    '発生日時',
    '復帰日時',
    '基板ID',
  ]
  getHumanDate(date:string) { return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }

  getStatusLabel(status:number) {
    if(status === StatusLevel.CRITICAL){
      return 'Alm'
    }else if(status === StatusLevel.HARD_WARNING){
      return 'Wrn'
    }
    return ""
  }
  handleSaveFile = () => {
    const {fromDate, toDate, onFileSave} = this.props
    const {columns} = this
    const rows = this.getRows()
    const fmt = 'YYYYMMDD';
    const fmtFromDate = moment(fromDate).format(fmt);
    const fmtToDate = moment(toDate).format(fmt);
    onFileSave(
      `history_${fmtFromDate}_${fmtToDate}.csv`,
      rows.map(fp.toArray),
      columns,
    )
  }
  getRows = () => {
    const {chamberSet, eventSectionSet, fromDate, toDate} = this.props
    const rows: IEventHistory[] = fp.pipe(
      fp.toArray(),
      fp.map((x: IEventSection):IEventHistory => {
        const eventSection = x;
        const chamber: IChamber|undefined = chamberSet[eventSection.chamberId];
        return {
          blockName: chamber.blockName,
          chamberName: chamber.name,
          statusLabel: this.getStatusLabel(eventSection.status),
          code: eventSection.code,
          fromDate:this.getHumanDate(eventSection.fromDate),
          toDate:this.getHumanDate(eventSection.toDate),
          message: eventSection.message,
          substractId: eventSection.substractId,
        };
      }),
      fp.sortBy((x:IEventHistory) => moment(x.fromDate)),
      fp.reverse,
    )(eventSectionSet)
    return rows
  }

  render = () => {
    const {
      chamberSet, 
      eventSectionSet, 
      fromDate, 
      toDate, 
      onRangeChange,
      onDateClick,
      onFromDateChange,
      onToDateChange,
    } = this.props
    const rows = this.getRows()
    const {columns} = this
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
        <BtnArea className='card'>
          <div className="button" onClick={this.handleSaveFile}>
            <i className="fas fa-file-download"></i>
          </div>
        </BtnArea>
        <ContentArea>
          <table className= {'table is-bordered is-fullwidth'}>
            <thead>
              <tr>
                {
                  columns.map(x => (
                    <th key={uuid()}>{x}</th>
                  ))
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
                    <td> { x.code } </td>
                    <td> { x.message } </td>
                    <td> 
                      <a 
                        className="button" 
                        href="#/trace/transition"
                        onClick={() => onDateClick(x.fromDate)}
                      > 
                        { x.fromDate } 
                      </a>
                    </td>
                    <td> { x.toDate } </td>
                    <td> { x.substractId } </td>
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
