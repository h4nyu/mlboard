import React from 'react'
import { storiesOf } from '@storybook/react';
import HeaderNav from '.';

storiesOf("HeaderNav", module)
  .add('default', () => {
    return (
      <HeaderNav 
        onReflesh={() => {}}
        onRouteChange={console.log}
      />
    )
  })
