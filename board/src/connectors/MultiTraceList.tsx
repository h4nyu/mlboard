import React from 'react'
import { observer } from 'mobx-react'
import MultiTraceList from '~/containers/MultiTraceList';
import MultiTracePlot from '~/connectors/MultiTracePlot';
import multiTraceStore from '~/store/multiTraceStore'

const Component = () => (
  <MultiTraceList 
    multiTraceSet={multiTraceStore.multiTraceSet}
    Child={MultiTracePlot}
    selectedId={multiTraceStore.selectedId}
    onAdd={multiTraceStore.add}
  />
)
export default observer(Component)
