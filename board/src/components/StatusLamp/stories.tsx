import React from 'react'
import { storiesOf } from '@storybook/react';
import StatusLamp from '.';

storiesOf("StatusLamp", module)
  .add('0: normal', () => {
    return (
      <StatusLamp
        status={0}
      />
    )
  })
  .add('1: warn', () => {
    return (
      <StatusLamp
        status={30}
      />
    )
  })
