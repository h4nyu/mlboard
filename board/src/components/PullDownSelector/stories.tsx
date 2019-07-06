import React from 'react'
import { storiesOf } from '@storybook/react';
import moment from 'moment';
import PullDownSelector from '.';
import {
  IChamber,
} from '~/core/models';

const rows = [
  {
    id: 'id-10',
    value: 'safadsfafas',
  }
]

storiesOf("PullDownSelector", module)
  .add('simple', () => {
    return (
      <PullDownSelector
        selectedId={'id-10'}
        onChange={console.log}
        options={rows}
        placeholder={"選択してください"}
      />
    );
  })
  .add('unselected', () => {
    return (
      <PullDownSelector
        selectedId={undefined}
        onChange={console.log}
        options={rows}
        placeholder={"選択してください"}
      />
    )
  })

