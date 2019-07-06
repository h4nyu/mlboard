import React from 'react'
import { observer } from 'mobx-react'

import {
  IMaintenance,
} from '~/core/models'
import MaintenanceListItem from '~/components/MaintenanceListItem';
import traceLevelStore from '~/store/traceLevelStore'
import chamberStore from '~/store/chamberStore'
import maintenanceLogStore from '~/store/maintenanceLogStore'
import maintenanceStore from '~/store/maintenanceStore'

export interface IProps {
  maintenance: IMaintenance
} 
const Component = (props: IProps) => (
  <MaintenanceListItem 
    maintenance={props.maintenance}
    chamberSet={chamberStore.chamberSet}
    traceLevelSet={traceLevelStore.traceLevelSet}
    maintenanceLogSet={maintenanceLogStore.maintenanceLogSet}
    onClick={maintenanceStore.onUpdate}
    onDeleteClick={maintenanceStore.onDeleteOne}
  />
)

export default observer(Component)

