import React from 'react'
import { storiesOf } from '@storybook/react';
import Transition from '.';
import {
  targetMock,
  chamberMock,
  traceMock,
  traceLevelMock,
  transitionMock,
} from '~/mocks'

const chamberSet = {
  'aaa': {
    ...chamberMock,
    id: 'aaa'
  }
}

const targetSet = {
  'aaa': {
    ...targetMock,
    id: 'bbb'
  }
}

const traceSet = {
  'ccc': {
    ...traceMock,
    id: 'bbb'
  }
}

const traceLevelSet = {
  'ddd': {
    ...traceLevelMock,
    id: 'ddd'
  }
}
storiesOf("Transition", module)
  .add('default', () => {
    const transition = {
      ...transitionMock,
      chamberId: 'aaa',
      targetId: 'bbb',
      traceId: 'ccc',
    }

    return (
      <Transition 
        transition={transition}
        chamberSet={chamberSet}
        targetSet={targetSet}
        traceSet={traceSet}
        traceLevelSet={traceLevelSet}
        onClose={console.log}
        onLock={console.log}
        onLog={console.log}
        onScatter={console.log}
        onRangeChange={console.log}
        onEditTraceLevel={console.log}
      />
    )
  })

