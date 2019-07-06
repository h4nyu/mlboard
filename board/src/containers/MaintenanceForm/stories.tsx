import React from 'react'
import { storiesOf } from '@storybook/react';
import MaintinanceForm from '.';
import { 
  chamberMock,
} from '~/mocks'
let num = 1
storiesOf("MaintinanceForm", module)
  .add('create', () => {
    const chamberSet = {
      'aaa': {
        ...chamberMock,
        id: 'aaa',
      },
      'bbb': {
        ...chamberMock,
        id: 'bbb',
      }
    }
    return (
      <MaintinanceForm
        id={'bfa'}
        name={'aaaa'}
        chamberId={"aaa"}
        onSave={console.log}
        onClose={console.log}
        onNameChange={console.log}
        onChamberIdChange={console.log}
        isActive={true}
        chamberSet={chamberSet}
      >
      </MaintinanceForm>
    )
  })



