import React from 'react'
import { storiesOf } from '@storybook/react'
import CorrelationList from '.'
import { IProps as IItemProps } from '~/connectors/CorrelationPlot'
import moment from 'moment'
import {
  correlationMock
} from '~/mocks'
import styled from 'styled-components'


const Layout = styled.div`
  height: 200px;
`

const ItemMock = (props: IItemProps) => (
  <Layout> item here </Layout>
)

storiesOf("CorrelationList", module)
  .add('default', () => {
    const correlationSet = {
      "aaa": {
        ...correlationMock,
        id: 'aaa',
      },
      "bbb": {
        ...correlationMock,
        id: 'bbb',
      }
    }
    return (
      <CorrelationList 
        correlationSet={correlationSet}
        Child={ItemMock}
        selectedId={"bbb"}
        onAdd={console.log}
      />
    )
  })

