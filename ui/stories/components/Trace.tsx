import React from 'react';
import { storiesOf } from '@storybook/react';
import TraceComponent from '~/components/Trace';
import {trace} from 'tests/mocks/models';


storiesOf('TraceListItem', module)
  .add('default', () => (
    <TraceComponent
      trace={trace}
      onSelect={console.debug}>
    </TraceComponent>
  ));
