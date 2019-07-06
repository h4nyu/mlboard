import React from 'react'
import { observer } from 'mobx-react'
import MaintenanceCopyFormModal from '~/containers/MaintenanceCopyFormModal';
import maintenanceStore from '~/store/maintenanceStore'

export interface IProps {
} 
const Component = (props: IProps) => {
  return (
    <MaintenanceCopyFormModal
      isOpen={maintenanceStore.isCopyFormActive}
      onClose={maintenanceStore.onCopyFormClose}
    />
  )
}

export default observer(Component)


