import React from 'react'
import { observer } from 'mobx-react'
import TraceEventSummaryTable from '~/components/TraceEventSummaryTable';
import traceEventStore from '~/store/traceEventStore'
import chamberStore from '~/store/chamberStore'
import targetStore from '~/store/targetStore'

const Component = () => (
  <TraceEventSummaryTable 
    traceEventSet={traceEventStore.traceEventSet}
    chamberSet={chamberStore.chamberSet}
    targetSet={targetStore.targetSet}
    fromDate={traceEventStore.fromDate}
    toDate={traceEventStore.toDate}
    onFromDateChange={traceEventStore.onFromDateChange}
    onToDateChange={traceEventStore.onToDateChange}
    onRangeChange={traceEventStore.fetch}
  />
)

export default observer(Component)
