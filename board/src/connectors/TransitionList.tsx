import React from 'react'
import { observer } from 'mobx-react'
import TransitionList from '~/containers/TransitionList';
import TransitionPlot from '~/connectors/TransitionPlot';
import transitionStore from '~/store/transitionStore'
import chamberStore from '~/store/chamberStore'
import targetStore from '~/store/targetStore'
import traceStore from '~/store/traceStore'
import traceLevelStore from '~/store/traceLevelStore'

const Component = () => (
  <TransitionList 
    Child={TransitionPlot}
    transitionSet={transitionStore.transitionSet}
    fromDate={transitionStore.fromDate}
    toDate={transitionStore.toDate}
    interval={transitionStore.interval}
    onSyncRange={transitionStore.onSyncRange}
    onShift={transitionStore.onShift}
    onFromDateChange={transitionStore.onFromDateChange}
    onToDateChange={transitionStore.onToDateChange}
    onIntervalInput={transitionStore.onIntervalInput}
  />
)
export default observer(Component)
