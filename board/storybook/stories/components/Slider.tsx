import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from '~/components/Slider';

storiesOf('Slider', module)
  .add('check', () => (
    <Component
      value={0.6}
      max={1}
      min={0}
      step={0.1}
      onInput={console.debug}
    />
  ));
