import React from 'react'
import { observer } from 'mobx-react'
import EventHistoryTable from '~/components/EventHistoryTable';
import eventSectionStore from '~/store/eventSectionStore'
import chamberStore from '~/store/chamberStore'
import fileStore from '~/store/fileStore'

const Component = () => (
  <EventHistoryTable 
    eventSectionSet={eventSectionStore.eventSectionSet}
    chamberSet={chamberStore.chamberSet}
    fromDate={eventSectionStore.fromDate}
    toDate={eventSectionStore.toDate}
    onRangeChange={eventSectionStore.fetch}
    onDateClick={eventSectionStore.setTransitionRange}
    onFileSave={fileStore.saveCsv}
    onFromDateChange={eventSectionStore.onFromDateChange}
    onToDateChange={eventSectionStore.onToDateChange}
  />
)
export default observer(Component)
