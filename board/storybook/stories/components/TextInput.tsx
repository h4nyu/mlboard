import React from 'react';
import TextInput from '~/components/TextInput';
import { storiesOf } from '@storybook/react';


storiesOf('TextInput', module)
  .add('default', () => {
    const value = '';
    return (
      <TextInput
        defaultValue={value}
        onInput={console.debug}
      />
    );
  })
  .add('input', () => {
    const value = 'text';
    return (
      <TextInput
        defaultValue={value}
        onInput={console.debug}
      />
    );
  });

