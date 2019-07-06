import React from 'react'
import moment from 'moment'
import TraceEventHistoryTable from '.';
import { storiesOf } from '@storybook/react';
import {
  traceEventMock,
  chamberMock, 
  targetMock,
  traceLevelMock,
} from "~/mocks"

storiesOf("TraceEventHistoryTable", module)
  .add('default', () => {
    const chamberSet = {
      'aaa': {
        ...chamberMock,
        id: 'aaa',
      }
    }

    const targetSet = {
      '111': {
        ...targetMock,
        id: '111',
        chamberId:'aaa'
      }
    }

    const traceEventSet = {
      ['abc']: {
        ...traceEventMock,
        id:'abc',
        targetId:'111'
      },
      ['bcd']:{
        ...traceEventMock,
          id:'bcd',
        targetId:'111'
      }
    }

    return (
      <TraceEventHistoryTable
        traceEventSet={traceEventSet}
        chamberSet={chamberSet}
        targetSet={targetSet}
        fromDate={moment().format()}
        toDate={moment().add(1, "days").format()}
        onRangeChange={console.debug}
        onFromDateChange={console.log}
        onToDateChange={console.log}
        onDateClick={console.log}
      >
      </TraceEventHistoryTable>
    )
  })

