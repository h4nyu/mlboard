import React from 'react';
import { storiesOf } from '@storybook/react';
import Check from '~/components/Check';

storiesOf('Check', module)
  .add('check', () => (
    <Check
      value={true}
      onClick={console.debug}
    />
  ))
  .add('uncheck', () => (
    <Check
      value={false}
      onClick={console.debug}
    />
  ));
