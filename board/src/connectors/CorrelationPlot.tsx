import React from 'react'
import { observer } from 'mobx-react'

import {
  ICorrelation,
} from '~/core/models'
import CorrelationPlot from '~/components/CorrelationPlot';
import traceStore from '~/store/traceStore'
import targetStore from '~/store/targetStore'
import correlationStore from '~/store/correlationStore'

export interface IProps {
  correlation: ICorrelation
} 
const Component = (props: IProps) => (
  <CorrelationPlot 
    correlation={props.correlation}
    traceSet={traceStore.traceSet}
    targetSet={targetStore.targetSet}
    onRangeChange={correlationStore.onRangeChange}
    onClose={correlationStore.onDeleteOne}
    onCopy={correlationStore.onCopy}
    onScatter={correlationStore.onScatter}
    onDeleteTrace={correlationStore.onDeleteTrace}
    onSelect={correlationStore.onSelect}
    onAxisChange={correlationStore.onAxisChange}
    onFromDateChange={correlationStore.onFromDateChange}
    onToDateChange={correlationStore.onToDateChange}
  />
)

export default observer(Component)

