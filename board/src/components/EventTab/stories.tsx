import React from 'react'
import { storiesOf } from '@storybook/react';
import EventTab from '.';
import { TabType } from '~/core/enums'

storiesOf("EventTab", module)
  .add('default', () => {
    return (
      <EventTab />
    )
  })
