import React from 'react'
import { observer } from 'mobx-react'
import { IChamber } from '~/core/models'
import MaintenanceCopyForm from '~/components/MaintenanceCopyForm'
import chamberStore from '~/store/chamberStore'
import maintenanceStore from  '~/store/maintenanceStore'


const Component = () => (
  <MaintenanceCopyForm 
    chamberSet={chamberStore.chamberSet}
    soruceIds={chamberStore.selectedIds}
    onCopy={maintenanceStore.copy}
  />
)

export default observer(Component)
