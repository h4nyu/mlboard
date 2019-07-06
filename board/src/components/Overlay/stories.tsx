import React from 'react'
import { storiesOf } from '@storybook/react';
import Overlay from '.';

storiesOf("Overlay", module)
  .add('0', () => {
    return (
      <Overlay
        isActive={false}
      />
    )
  })
  .add('1', () => {
    return (
      <Overlay
        isActive={true}
      />
    )
  })

