import React from 'react'
import { storiesOf } from '@storybook/react';
import SkipPanel from '.';

storiesOf("SkipPanel", module)
  .add('true', () => {
    return (
      <SkipPanel 
        interval={50} 
        onShift={(x) => {console.log(x)}}
        onIntervalChange={(x) => {console.log(x)}}
      />
    )
  })
