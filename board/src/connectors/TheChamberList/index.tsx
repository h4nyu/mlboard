import React from 'react'
import { observer } from 'mobx-react'
import ChamberList from '~/components/ChamberList';
import chamberStore from '~/store/chamberStore'

const TheChamberList: React.FC<{}> = () => (
  <ChamberList 
    chamberSet={chamberStore.chamberSet}
    selectedIds={chamberStore.selectedIds}
    onSelect={chamberStore.select}
  />
)

export default observer(TheChamberList)

