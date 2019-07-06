import React from 'react'
import { observer } from 'mobx-react'
import ChamberList from '~/components/ChamberList';
import MaintenanceList from '~/components/MaintenanceList';
import MaintenanceListItem from '~/connectors/MaintenanceListItem';
import maintenanceStore from '~/store/maintenanceStore'
import chamberStore from '~/store/chamberStore'

const Component = () => (
  <MaintenanceList 
    maintenanceSet={maintenanceStore.maintenanceSet}
    chamberIds={chamberStore.selectedIds}
    Child={MaintenanceListItem}
    onAdd={maintenanceStore.onAdd}
    onCopy={maintenanceStore.onCopyFormOpen}
  />
)

export default observer(Component)

