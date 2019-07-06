import React from 'react'
import { storiesOf } from '@storybook/react';
import Component from '.';
import {
  IChamber,
} from '~/core/models'
import { 
  traceLevelMock,
  chamberMock
} from '~/mocks'

storiesOf("MaintenancdCopyForm", module)
  .add('create', () => {

    const chamberSet: {[key: string]: IChamber} = {
      'aaa': {
        ...chamberMock,
        id: 'aaa',
        name: 'aaaa'
      },
      'bbb': {
        ...chamberMock,
        id: 'bbb',
        name: 'bbb'
      },
      'ccc': {
        ...chamberMock,
        id: 'ccc',
        name: 'ccc'
      }
    }

    const soruceIds:string[] = ['aaa']
    const destinationIds:string[] = []

    return (
      <Component
        chamberSet={chamberSet}
        soruceIds={soruceIds}
        onCopy={() => {console.log('save')}}
      >
      </Component>
    )
  })
