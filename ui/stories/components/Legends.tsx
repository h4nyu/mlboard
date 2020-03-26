import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from '~/components/Legends';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

storiesOf('Legends', module)
  .add('default', () => (
    <Component
      values={
        [
          {id:'a', name:'a'},
          {id:'b', name:'b'}
        ]
      }
      onClick={action('onClick')}
    />
  ))
