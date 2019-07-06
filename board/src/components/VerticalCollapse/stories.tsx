import React from 'react'
import { storiesOf } from '@storybook/react';
import VerticalCollapse from '.';

storiesOf("VerticalCollapse", module)
  .add('open', () => {
    return (
      <VerticalCollapse>
        <div> content here </div>
      </VerticalCollapse>
    )
  })
