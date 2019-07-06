import React from 'react'
import { observer } from 'mobx-react'
import {
  ITransition,
} from '~/core/models'
import TransitionPlot from '~/components/TransitionPlot';
import chamberStore from '~/store/chamberStore'
import traceLevelStore from '~/store/traceLevelStore'
import traceStore from '~/store/traceStore'
import targetStore from '~/store/targetStore'
import transitionStore from '~/store/transitionStore'

export interface IProps {
  transition: ITransition
} 
const Component = (props: IProps) => (
  <TransitionPlot
    transition={props.transition}
    traceSet={traceStore.traceSet}
    targetSet={targetStore.targetSet}
    chamberSet={chamberStore.chamberSet}
    traceLevelSet={traceLevelStore.traceLevelSet}
    onRangeChange={transitionStore.onRangeChange}
    onClose={transitionStore.onDeleteOne}
    onScatter={transitionStore.onScatter}
    onLock={transitionStore.onLock}
    onLog={transitionStore.onLog}
    onEditTraceLevel={targetStore.onEditTraceLevel}
  />
)
export default observer(Component)
