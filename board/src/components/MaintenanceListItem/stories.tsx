import React from 'react'
import { storiesOf } from '@storybook/react';
import { TargetType, StatusLevel } from '~/core/enums'
import MaintenanceListItem from '.';
import { 
  maintenanceMock, 
  chamberMock,
  traceLevelMock,
  maintenanceLogMock,
} from '~/mocks'

storiesOf("MaintenanceListItem", module)
  .add('0', () => {
    const maintenance = {
      ...maintenanceMock,
      chamberId: 'aaa'
    }
    const chamberSet = {
      'aaa': {
        ...chamberMock,
        id: 'aaa'
      }
    }

    const traceLevelSet = {
      [maintenance.id]: {
        ...traceLevelMock,
        id: maintenance.id
      }
    }

    const maintenanceLogSet = {
      ['bbb']: {
        ...maintenanceLogMock,
        id: 'bbb',
        maintenanceId: maintenance.id
      }
    }

    return (
      <MaintenanceListItem 
        maintenance={maintenance}
        chamberSet={chamberSet}
        traceLevelSet={traceLevelSet}
        maintenanceLogSet={maintenanceLogSet}
        onDeleteClick={console.log}
        onClick={console.log}
      />
    )
  })


