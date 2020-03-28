import React from 'react';
import { storiesOf } from '@storybook/react';
import TraceConfig from '~/components/TraceConfig';
import {trace} from 'tests/mocks/models';
import { action } from '@storybook/addon-actions';


storiesOf('TraceConfig', module)
  .add('default', () => (
    <TraceConfig
      trace={trace}
      onDeleteClick={action('onDeleteClick')}>
    </TraceConfig>
  ));
