import React from 'react';
import { storiesOf } from '@storybook/react';
import Check from '~/components/Check';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

storiesOf('Check', module)
  .add('default', () => (
    <Check
      value={boolean('value', false)}
      onClick={action('onClick')}
    />
  ))
