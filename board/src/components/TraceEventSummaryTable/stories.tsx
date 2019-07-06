import React from 'react'
import moment from 'moment'
import TraceEventSummaryTable from '.';
import { storiesOf } from '@storybook/react';
import {
  traceEventMock,
  chamberMock, 
  targetMock,
  traceLevelMock,
} from "~/mocks"

storiesOf("TraceEventSummaryTable", module)
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
      },
      '222': {
        ...targetMock,
        id: '222',
        chamberId:'aaa',
        name:'sensor-2'
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
      <TraceEventSummaryTable
        traceEventSet={traceEventSet}
        chamberSet={chamberSet}
        targetSet={targetSet}
        fromDate={moment().format()}
        toDate={moment().add(1, "days").format()}
        onFromDateChange={console.log}
        onToDateChange={console.log}
        onRangeChange={console.debug}
      />
    )
  })

