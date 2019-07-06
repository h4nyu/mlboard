import React from 'react'
import { observer } from 'mobx-react'

import {
  IMultiTrace,
} from '~/core/models'
import MultiTracePlot from '~/components/MultiTracePlot';
import traceStore from '~/store/traceStore'
import targetStore from '~/store/targetStore'
import multiTraceStore from '~/store/multiTraceStore'

export interface IProps {
  multiTrace: IMultiTrace
} 
const Component = (props: IProps) => (
  <MultiTracePlot 
    multiTrace={props.multiTrace}
    traceSet={traceStore.traceSet}
    targetSet={targetStore.targetSet}
    onShift={multiTraceStore.onShift}
    onRangeChange={multiTraceStore.onRangeChange}
    onFromDateChange={multiTraceStore.onFromDateChange}
    onToDateChange={multiTraceStore.onToDateChange}
    onIntervalChange={multiTraceStore.onIntervalChange}
    onClose={multiTraceStore.onDeleteOne}
    onCopy={multiTraceStore.copy}
    onScatter={multiTraceStore.onScatter}
    onDeleteTrace={multiTraceStore.deleteTrace}
    onSelect={multiTraceStore.select}
  />
)

export default observer(Component)
