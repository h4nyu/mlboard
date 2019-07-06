import React from 'react'
import { storiesOf } from '@storybook/react';
import MultiTracePlot from '.';
import moment from 'moment'

import {
  chamberMock, 
  traceMock,
  targetMock,
  multiTraceMock,
} from "~/mocks"

const traceSet = {
  "ccc": {
    ...traceMock,
      targetId: 'aaa',
      id:'ccc',
  },
  "ddd": {
    ...traceMock,
    targetId: 'bbb',
    id:'ddd',
  }
}
const targetSet = {
  'aaa': {
    ...targetMock,
    id: 'aaa',
  },
  'bbb': {
    ...targetMock,
    id: 'bbb',
  }
}

storiesOf("MultiTracePlot", module)
  .add('2', () => {
    const multiTrace = {
      ...multiTraceMock,
      traceIds: ["ccc", 'ddd'],
    }
    return (
      <MultiTracePlot 
        multiTrace={multiTrace}
        targetSet={targetSet}
        traceSet={traceSet}
        onCopy={console.log}
        onShift={console.log}
        onIntervalChange={console.log}
        onRangeChange={console.log}
        onScatter={console.log}
        onClose={console.log}
        onDeleteTrace={console.log}
        onSelect={console.log}
        onFromDateChange={console.log}
        onToDateChange={console.log}
      />
    )
  })
  .add('1', () => {
    const multiTrace = {
      ...multiTraceMock,
      traceIds: ["ccc"],
    }
    return (
      <MultiTracePlot 
        multiTrace={multiTrace}
        targetSet={targetSet}
        traceSet={traceSet}
        onCopy={console.log}
        onShift={console.log}
        onIntervalChange={console.log}
        onRangeChange={console.log}
        onScatter={console.log}
        onClose={console.log}
        onDeleteTrace={console.log}
        onSelect={console.log}
        onFromDateChange={console.log}
        onToDateChange={console.log}
      />
    )
  })
  .add('0', () => {
    const multiTrace = {
      ...multiTraceMock,
      traceIds: [],
    }
    return (
      <MultiTracePlot 
        multiTrace={multiTrace}
        targetSet={targetSet}
        traceSet={traceSet}
        onCopy={console.log}
        onShift={console.log}
        onIntervalChange={console.log}
        onRangeChange={console.log}
        onScatter={console.log}
        onClose={console.log}
        onDeleteTrace={console.log}
        onSelect={console.log}
        onFromDateChange={console.log}
        onToDateChange={console.log}
      />
    )
  })

