import React from 'react'
import { observer } from 'mobx-react'
import CorrelationList from '~/containers/CorrelationList';
import CorrelationPlot from '~/connectors/CorrelationPlot';
import correlationStore from '~/store/correlationStore'

const Component = () => (
  <CorrelationList
    correlationSet={correlationStore.correlationSet}
    Child={CorrelationPlot}
    selectedId={correlationStore.selectedId}
    onAdd={correlationStore.onAdd}
  />
)
export default observer(Component)

