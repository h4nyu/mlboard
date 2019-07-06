import React from 'react'
import { observer } from 'mobx-react'
import TargetList from '~/components/TargetList';
import TargetListItem from '~/connectors/TargetListItem';
import targetStore from '~/store/targetStore'
import chamberStore from '~/store/chamberStore'
import transitionStore from '~/store/transitionStore'
import diffStore from '~/store/diffStore'

const TheTargetList = () => (
  <TargetList
    chamberIds={chamberStore.selectedIds}
    targetSet={targetStore.targetSet}
    diffSet={diffStore.diffSet}
    onReloadClick={diffStore.fetch}
    Child={TargetListItem}
  />
)

export default observer(TheTargetList)


