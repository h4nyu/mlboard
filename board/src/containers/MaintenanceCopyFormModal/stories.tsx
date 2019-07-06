import React from 'react'
import { storiesOf } from '@storybook/react';
import MaintenanceCopyFormModal from '.';

storiesOf("MaintenanceCopyFormModal", module)
  .add('open', () => {
    return (
      <MaintenanceCopyFormModal
        isOpen={true}
        onClose={console.log}
      />
    )
  })
