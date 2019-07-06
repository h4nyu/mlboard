import React from 'react'
import { observer } from 'mobx-react'
import ChamberList from '~/components/ChamberList';
import { IChamber } from '~/core/models'
import CopyChamberList from '~/components/CopyChamberList';
import maintenanceStore from '~/store/maintenanceStore'
import chamberStore from '~/store/chamberStore'


export interface IProps {
  chamberSet: {[id: string]: IChamber}
} 

const Component = (props: IProps) => (
  <CopyChamberList 
    chamberSet={props.chamberSet}
    selectedIds={maintenanceStore.copyIds}
    onSelect={maintenanceStore.selectedCopyId}
  />
)

export default observer(Component)
