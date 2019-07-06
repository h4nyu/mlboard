import React from 'react'
import { observer } from 'mobx-react'

import {
  ITarget,
  IDiff
} from '~/core/models'
import TargetListItem from '~/components/TargetListItem';
import traceLevelStore from '~/store/traceLevelStore'
import chamberStore from '~/store/chamberStore'
import targetStore from '~/store/targetStore'
import diffStore from '~/store/diffStore'

export interface IProps {
  target: ITarget
} 

const Component = (props: IProps) => (
  <TargetListItem 
    target={props.target}
    chamberSet={chamberStore.chamberSet}
    traceLevelSet={traceLevelStore.traceLevelSet}
    diffSet={diffStore.diffSet}
    onClick={targetStore.add}
    onEditTraceLevel={targetStore.onEditTraceLevel}
  />
)

export default observer(Component)
