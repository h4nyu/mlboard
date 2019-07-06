import React from 'react'
import { storiesOf } from '@storybook/react'
import MaintenanceList from '.'
import {IProps as IItemProps} from '~/connectors/MaintenanceListItem'
import moment from 'moment'

import { 
  maintenanceMock, 
  chamberMock,
} from '~/mocks'

storiesOf("MaintenanceList", module)
  .add('default', () => {
    const chamberIds = ['aaa']
    const chamberSet = {
      'aaa': {
        ...chamberMock,
        id: 'aaa',
      }
    }

    const maintenanceSet = {
      '111': {
        ...maintenanceMock,
        id: '111',
        chamberId: 'aaa',
      },
      '222': {
        ...maintenanceMock,
        id: '222',
        chamberId: 'aaa',
        status:30
      },
      '333': {
        ...maintenanceMock,
        id: '333',
        chamberId: 'bbb',
      }
    }

    return (
      <MaintenanceList
        chamberIds={chamberIds}
        maintenanceSet={maintenanceSet}
        Child={(IItemProps) => (<div>mock</div>)}
        onAdd={console.log}
        onCopy={() => {console.log('copy')}}
      />
    )
  })
