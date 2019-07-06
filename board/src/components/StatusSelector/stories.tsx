import React from 'react'
import { storiesOf } from '@storybook/react'
import {StatusLevel} from "~/core/enums"
import StatusSelector from '.'

storiesOf("StatusSelector", module)
  .add('default', () => {
    return (
      <StatusSelector
        onChange={(value: StatusLevel) => {console.log(value)}}
      />
    )
  })
