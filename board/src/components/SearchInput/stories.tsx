import React from 'react'
import { storiesOf } from '@storybook/react';
import SearchInput from '.';

storiesOf("SearchInput", module)
  .add('0: normal', () => {
    return (
      <SearchInput
        placeholder={'placeholder here'}
        onInput={(text: string) => {console.log(text)}}
      />
    )
  })
