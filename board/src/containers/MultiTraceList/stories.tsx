import React from 'react'
import { storiesOf } from '@storybook/react'
import MultiTraceList from '.'
import { IProps as IItemProps } from '~/connectors/MultiTracePlot'
import moment from 'moment'
import {
  targetMock,
  chamberMock,
  traceMock,
  traceLevelMock,
  multiTraceMock,
} from '~/mocks'
import styled from 'styled-components'


const Layout = styled.div`
  height: 200px;
`
const ItemMock = (props: IItemProps) => (
  <Layout> item here </Layout>
)

storiesOf("MultiTraceList", module)
  .add('default', () => {
    const multiTraceSet = {
      "aaa": {
        ...multiTraceMock,
        traceIds: ["ccc"],
        id: 'aaa',
      },
      "bbb": {
        ...multiTraceMock,
        traceIds: ["ccc"],
        id: 'bbb',
      }
    }
    return (
      <MultiTraceList 
        multiTraceSet={multiTraceSet}
        Child={ItemMock}
        selectedId={"bbb"}
        onAdd={console.log}
      />
    )
  })

