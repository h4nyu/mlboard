import React from 'react'
import { observer } from 'mobx-react'
import EventSummaryTable from '~/components/EventSummaryTable';
import eventSectionStore from '~/store/eventSectionStore'
import chamberStore from '~/store/chamberStore'
import fileStore from '~/store/fileStore'

const TheEventSummaryTable: React.FC<{}> = () => (
  <EventSummaryTable
    eventSectionSet={eventSectionStore.eventSectionSet}
    chamberSet={chamberStore.chamberSet}
    fromDate={eventSectionStore.fromDate}
    toDate={eventSectionStore.toDate}
    onRangeChange={eventSectionStore.fetch}
    onFileSave={fileStore.saveCsv}
    onFromDateChange={eventSectionStore.onFromDateChange}
    onToDateChange={eventSectionStore.onToDateChange}
  />
)

export default observer(TheEventSummaryTable)
