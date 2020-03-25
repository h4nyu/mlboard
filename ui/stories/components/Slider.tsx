import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from '~/components/Slider';

storiesOf('Slider', module)
  .add('default', () => (
    <Component
      defaultValue={0.0}
      max={1}
      min={0}
      step={0.1}
      onInput={console.debug}
    />
  ))
  .add('defaultValue', () => (
    <Component
      defaultValue={0.5}
      max={1}
      min={0}
      step={0.1}
      onInput={console.debug}
    />
  ));
