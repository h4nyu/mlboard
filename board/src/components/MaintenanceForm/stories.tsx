import React from 'react'
import { storiesOf } from '@storybook/react';
import Component from '.';
import { 
  traceLevelMock,
  chamberMock
} from '~/mocks'
import uuid from "uuid";

storiesOf("MaintenanceForm", module)
  .add('create', () => {
    const chambers = [
      {
        ...chamberMock,
        id: uuid()
      },
      {
        ...chamberMock,
        id: uuid()
      }
    ]
    return (
      <Component
        id={undefined}
        chambers={chambers}
        onSelect={x => {console.log(x)}}
      >
      </Component>
    )
  })


