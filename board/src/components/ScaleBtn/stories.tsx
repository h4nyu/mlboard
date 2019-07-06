import React from 'react'
import { storiesOf } from '@storybook/react';
import Component from '.';

storiesOf("ScaleBtn", module)
  .add('default', () => {
    return (
      <Component 
        onPlusClick={() => {console.log('plus')}}
        onMinasClick={() => {console.log('minus')}}
      >
      </Component>
    )
  })


