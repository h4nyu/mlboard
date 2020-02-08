import React from 'react';
import { storiesOf } from '@storybook/react';
import Chart from '~/components/Chart';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

storiesOf('Chart', module)
  .add('default', () => (
    <Chart 
      config={{
        type:"bar"
      }}
    />
  ))
