import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from '~/components/PageHeader';
import { action } from '@storybook/addon-actions';

storiesOf('PageHeader', module)
  .add('default', () => (
    <Component
      onRefleshClick={action('onRefleshClick')}
    />
  ))
