import React from 'react'
import { storiesOf } from '@storybook/react';
import SelectCard from '.';

storiesOf("SelectCard", module)
  .add('selected', () => {
    return (
      <SelectCard
        isSelected={true}
      >
        <div> content here </div>
      </SelectCard>
    )
  })
  .add('unselected', () => {
    return (
      <SelectCard
        isSelected={false}
      >
        <div> content here </div>
      </SelectCard>
    )
  })


