import React from 'react'
import { List, AutoSizer, ListRowProps} from 'react-virtualized';
import {
  ITransition,
  ITarget,
  IChamber,
  ITrace,
  ITraceLevel,
} from '~/core/models'
import {IProps as IChildProps} from "~/connectors/TransitionPlot"
import RangeDatetimeInput from '~/components/RangeDatetimeInput'
import SkipPanel from '~/components/SkipPanel'
import fp from 'lodash/fp'
import uuid from 'uuid'
import styled from 'styled-components'

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "header finder search"
    "content content content";
  grid-template-columns: 1fr auto auto;
  grid-template-rows: auto 1fr;
  height: 100%;
`

const HeaderArea = styled.div`
  grid-area: header;
`

const FinderArea = styled.div`
  grid-area: finder;
  padding: 0.5em;
`

const SearchArea = styled.div`
  grid-area: search;
  padding: 0.5em;
`

const ContentArea = styled.div`
  grid-area: content;
`

interface ITransitionListProps {
  Child: React.FC<IChildProps>
  transitionSet: {[id: string]: ITransition}
  interval: number
  fromDate: string
  toDate: string
  onFromDateChange: (datetime:string) => void
  onToDateChange: (datetime:string) => void
  onSyncRange: (fromDate:string, toDate:string) => void
  onShift: (interval: number) => void
  onIntervalInput: (interval: number) => void
}
export default class TransitionList extends React.Component<ITransitionListProps> {
  getRows = () => {
    const { 
      transitionSet, 
    } = this.props
    const rows = fp.toArray(transitionSet)
    return rows
  }

  rowRenderer = (rows:ITransition[], listRowProps:ListRowProps) => {
    const { Child, } = this.props
    const row = rows[listRowProps.index]
    return (
      <div key={row.id} style={listRowProps.style}>
        <Child
          transition={row}
        />
      </div>
    )
  }

  render = () => {
    const {
      fromDate, 
      toDate,
      interval,
      onSyncRange,
      onShift,
      onIntervalInput,
      onFromDateChange,
      onToDateChange,
      Child,
    } = this.props
    const rows = this.getRows()
    const {rowRenderer} = this
    return (
      <Layout>
        <HeaderArea>
          <p className="card-header-title">
            推移
          </p>
        </HeaderArea>
        <SearchArea>
          <RangeDatetimeInput
            toDate={toDate}
            fromDate={fromDate}
            onFromDateChange={onFromDateChange}
            onToDateChange={onToDateChange}
            onSubmit={onSyncRange}
          />
        </SearchArea>
        <FinderArea>
          <SkipPanel
            interval={interval}
            onIntervalChange={onIntervalInput}
            onShift={onShift}
          />
        </FinderArea>
        <ContentArea>
          <hr />
          <AutoSizer>

            {({ height, width }) => (
              <List
                style={{ outline: 'none' }}
                width={width}
                height={height}
                rowHeight={209}
                rowRenderer={(x) => rowRenderer(rows, x)}
                rowCount={rows.length}
              />)}
          </AutoSizer>
        </ContentArea>
      </Layout>
    );
  }
}
