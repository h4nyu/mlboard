import React from 'react';
import { storiesOf } from '@storybook/react';
import TraceListItem from '~/components/TraceListItem';
import {trace} from 'tests/mocks/models';


storiesOf('TraceListItem', module)
  .add('default', () => (
    <TraceListItem
      trace={trace}
      onSelect={console.debug}>
    </TraceListItem>
  ));
