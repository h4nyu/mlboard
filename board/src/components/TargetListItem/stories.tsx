import React from 'react'
import { storiesOf } from '@storybook/react';
import { TargetType, StatusLevel } from '~/core/enums'
import TargetListItem from '.';
import { 
  targetMock, 
  chamberMock,
  traceLevelMock,
  diffMock
} from '~/mocks'


storiesOf("TargetListItem", module)
  .add('0', () => {
    const chamberSet = {
      'aaa': {
        ...chamberMock,
        id: 'aaa',
      }
    }
    const target = {
      ...targetMock,
      chamberId: 'aaa',
      id: 'bbb'
    }

    const diffSet = {
      'bbb':{
        ...diffMock,
        id: 'bbb'
      }
    }

    const traceLevelSet = {
      'bbb': {
        ...traceLevelMock,
        id: 'bbb'
      }
    }

    return (
      <TargetListItem 
        target={target}
        diffSet={diffSet}
        chamberSet={chamberSet}
        traceLevelSet={traceLevelSet}
        onClick={console.info}
        onEditTraceLevel={console.log}
      />
    )
  })


