import React from 'react'
import { storiesOf } from '@storybook/react'
import TransitionList from '.'
import {IProps as IChildProps} from '~/connectors/TransitionPlot'
import moment from 'moment'
import {
  targetMock,
  chamberMock,
  traceMock,
  traceLevelMock,
  transitionMock,
} from '~/mocks'

storiesOf("TransitionList", module)
  .add('default', () => {
    const chamberSet = {
      'aaa': {
        ...chamberMock,
        id: 'aaa'
      }
    }
    const targetSet = {
      'bbb': {
        ...targetMock,
        id: 'bbb',
      }
    }
    const traceSet = {
      'ccc': {
        ...traceMock,
        id: 'ccc',
      }
    }
    const transitionSet = {
      'ddd':{
        id: 'ddd',
        chamberId: 'aaa',
        targetId: 'bbb',
        traceId: 'ccc',
        ...transitionMock,
      }
    }
    const traceLevelSet = {
      'bbb': {
        ...traceLevelMock,
        id: 'bbb',
      }
    }

    return (
      <TransitionList 
        Child={(props:IChildProps) => <div> child here </div>}
        transitionSet={transitionSet}
        fromDate={moment().format()}
        toDate={moment().format()}
        interval={100}
        onIntervalInput={console.log}
        onSyncRange={console.log}
        onShift={console.log}
        onFromDateChange={console.log}
        onToDateChange={console.log}
      />
    )
  })
