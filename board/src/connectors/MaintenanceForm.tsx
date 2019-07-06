import React from 'react'
import { observer } from 'mobx-react'
import MaintenanceForm from '~/containers/MaintenanceForm';
import maintenanceStore from '~/store/maintenanceStore'
import chamberStore from '~/store/chamberStore'

export interface IProps {
} 
const Component = (props: IProps) => (
  <MaintenanceForm
    isActive={maintenanceStore.isFormActive}
    id={maintenanceStore.id}
    name={maintenanceStore.name}
    chamberId={maintenanceStore.chamberId}
    chamberSet={chamberStore.chamberSet}
    onNameChange={maintenanceStore.onNameChange}
    onChamberIdChange={maintenanceStore.onChamberIdChange}
    onSave={maintenanceStore.onSave}
    onClose={maintenanceStore.onFormClose}
  />
)

export default observer(Component)
