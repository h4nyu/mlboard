import React from 'react'
import { observer } from 'mobx-react'
import ChamberList from '~/components/ChamberList';
import MaintenanceLogList from '~/components/MaintenanceLogList';
import maintenanceStore from '~/store/maintenanceStore'
import maintenanceLogStore from '~/store/maintenanceLogStore'

const Component = () => (
  <MaintenanceLogList 
    maintenanceLogSet={maintenanceLogStore.maintenanceLogSet}
    maintenanceId={maintenanceStore.id}
    occurredDate={maintenanceLogStore.occurredDate}
    onOccuredDateChange={maintenanceLogStore.onOccuredDateChange}
    onAdd={maintenanceLogStore.onAdd}
    onDelete={maintenanceLogStore.onDeleteOne}
  />
)

export default observer(Component)


