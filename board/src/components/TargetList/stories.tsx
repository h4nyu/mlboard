import React from 'react'
import { storiesOf } from '@storybook/react'
import TargetList from '.'
import {
  chamberMock, 
  targetMock,
  diffMock
} from "~/mocks"
import {IProps as IChildProps} from '~/connectors/TargetListItem'

storiesOf("TargetList", module)
  .add('default', () => {
    const chamberIds = ['aaa']
    const targetSet = {
      '111': {
        ...targetMock,
        id: '111',
        chamberId: 'aaa',
      },
      '222': {
        ...targetMock,
        id: '222',
        chamberId: 'aaa',
      }
    }
    const diffSet = {
      '111': {
        ...diffMock,
        id: '111',
      },
      '222': {
        ...diffMock,
        id: '222',
        value:20
      }
    }
    return (
      <div 
        style={{
          height: '300px'
        }}
      >
        <TargetList
          chamberIds={chamberIds}
          targetSet={targetSet}
          diffSet={diffSet}
          onReloadClick={() => {console.log('reload')}}
          Child={(props:IChildProps) => <div>{props.target.id}</div>}
        />
      </div>
    )
  })
