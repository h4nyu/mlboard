import React from 'react'
import { storiesOf } from '@storybook/react';
import DatetimeInput from '.';
import moment from 'moment'

storiesOf("DatetimeInput", module)
  .add('true', () => {
    return (
      <DatetimeInput
        value={moment().format()}
        onSubmit={(value: string) => {console.log(value)}}
      />
    )
  })
