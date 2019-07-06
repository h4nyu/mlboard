import React from 'react'
import { storiesOf } from '@storybook/react';
import TraceLevel from '.';

storiesOf("TraceLevel", module)
  .add('0', () => {
    const traceLevel = {
      id: "fdsfafsa",
      warningLevel: 1,
      errorLevel: 2,
    }
    return (
      <TraceLevel
        traceLevel={traceLevel}
      />
    )
  })

