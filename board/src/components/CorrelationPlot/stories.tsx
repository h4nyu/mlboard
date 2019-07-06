import React from 'react'
import { storiesOf } from '@storybook/react';
import CorrelationPlot from '.';
import moment from 'moment'

import {
  chamberMock, 
  traceMock,
  targetMock,
  multiTraceMock,
  correlationMock,
} from "~/mocks"

storiesOf("CorrelationPlot", module)
  .add('false', () => {
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
    const correlation = {
      ...correlationMock,
      xTraceId: "ccc",
      yTraceIds: ['ccc', 'ddd'],
    }
    return (
      <CorrelationPlot 
        correlation={correlation}
        traceSet={traceSet}
        targetSet={targetSet}
        onAxisChange={console.log}
        onClose={console.info}
        onScatter={console.info}
        onRangeChange={console.info}
        onCopy={console.info}
        onDeleteTrace={console.info}
        onSelect={console.info}
        onFromDateChange={console.info}
        onToDateChange={console.info}
      />
    )
  })


