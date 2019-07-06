import React from 'react'
import { observer } from 'mobx-react'
import TraceLevelForm from '~/components/TraceLevelForm';
import traceLevelStore from '~/store/traceLevelStore'

export interface IProps {
} 
const Component = (props: IProps) => (
  <TraceLevelForm
    id={traceLevelStore.id}
    warningLevel={traceLevelStore.warningLevel}
    errorLevel={traceLevelStore.errorLevel}
    onSave={traceLevelStore.onSave}
    onDeleteOne={traceLevelStore.onDeleteOne}
    onWarningInput={traceLevelStore.onWarningInput}
    onErrorInput={traceLevelStore.onErrorInput}
  />
)

export default observer(Component)

