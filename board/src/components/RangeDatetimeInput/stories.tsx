import React from 'react'
import { storiesOf } from '@storybook/react'
import RangeDatetime from '.'
import moment from 'moment'

storiesOf("RangeDatetime", module)
  .add('default', () => {
    return (
      <RangeDatetime
        fromDate={moment().format()}
        toDate={moment().format()}
        onSubmit={console.log}
        onFromDateChange={console.log}
        onToDateChange={console.log}
      />
    )
  })
