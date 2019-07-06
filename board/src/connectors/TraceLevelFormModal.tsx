import React from 'react'
import { observer } from 'mobx-react'
import TraceLevelFormModal from '~/containers/TraceLevelFormModal';
import traceLevelStore from '~/store/traceLevelStore'

export interface IProps {
} 
const Component = (props: IProps) => {
  return (
    <TraceLevelFormModal
      isOpen={traceLevelStore.isFormActive}
      onClose={traceLevelStore.onCloseForm}
    />
  )
}

export default observer(Component)


