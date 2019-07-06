import React from 'react'
import { storiesOf } from '@storybook/react';
import TraceLevelFormModal from '.';

storiesOf("TraceLevelFormModal", module)
  .add('open', () => {
    return (
      <TraceLevelFormModal
        isOpen={true}
        onClose={console.log}
      />
    )
  })
