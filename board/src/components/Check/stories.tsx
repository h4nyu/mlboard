import React from 'react'
import { storiesOf } from '@storybook/react';
import Switch from '.';

storiesOf("Switch", module)
  .add('true', () => {
    return (
      <Switch
        value={true}
      />
    )
  })
  .add('false', () => {
    return (
      <Switch
        value={false}
      />
    )
  })
