import React from 'react'
import { observer } from 'mobx-react'
import TraceEventHistoryTable from '~/components/TraceEventHistoryTable';
import traceEventStore from '~/store/traceEventStore'
import chamberStore from '~/store/chamberStore'
import targetStore from '~/store/targetStore'


const Component = () => (
  <TraceEventHistoryTable 
    traceEventSet={traceEventStore.traceEventSet}
    chamberSet={chamberStore.chamberSet}
    targetSet={targetStore.targetSet}
    fromDate={traceEventStore.fromDate}
    toDate={traceEventStore.toDate}
    onRangeChange={traceEventStore.fetch}
    onFromDateChange={traceEventStore.onFromDateChange}
    onToDateChange={traceEventStore.onToDateChange}
    onDateClick={traceEventStore.setTransitionRange}
  />
)

export default observer(Component)
