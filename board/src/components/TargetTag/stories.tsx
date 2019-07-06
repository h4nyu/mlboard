import React from 'react'
import { storiesOf } from '@storybook/react';
import { TargetType } from '~/core/enums'; 
import TargetTag from '.';

storiesOf("TargetTag", module)
  .add('SENSOR', () => {
    return (
      <TargetTag
        targetType={TargetType.SENSOR}
      />
    )
  })
  .add('PROCESS', () => {
    return (
      <TargetTag
        targetType={TargetType.PROCESS}
      />
    )
  })
