import React from 'react'
import { storiesOf } from '@storybook/react';
import Component from '.';
import { 
  traceLevelMock,
} from '~/mocks'
let num = 1
storiesOf("TraceLevelForm", module)
  .add('create', () => {
    return (
      <Component
        id={undefined}
        warningLevel={traceLevelMock.warningLevel}
        errorLevel={traceLevelMock.errorLevel}
        onSave={() => {}}
        onWarningInput={x => {num = x}}
        onErrorInput={x => {console.log(x);}}
        onDeleteOne={console.log}
      >
      </Component>
    )
  })
  .add('update', () => {
    return (
      <Component
        id={traceLevelMock.id}
        warningLevel={traceLevelMock.warningLevel}
        errorLevel={traceLevelMock.errorLevel}
        onSave={() => {}}
        onWarningInput={x => {num = x}}
        onErrorInput={x => {console.log(x);}}
        onDeleteOne={console.log}
      >
      </Component>
    )
  })


