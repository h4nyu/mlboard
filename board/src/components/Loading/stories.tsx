import React from 'react'
import { storiesOf } from '@storybook/react';
import Loading from '.';

storiesOf("Loading", module)
  .add('0', () => {
    return (
      <Loading
        pendingNum={0}
      />
    )
  })
  .add('1', () => {
    return (
      <Loading
        pendingNum={1}
      />
    )
  })
