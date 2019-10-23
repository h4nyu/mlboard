import React from 'react';
import { storiesOf } from '@storybook/react';
import TraceListItem from '~/components/TraceListItem';
import {simple} from 'tests/mocks/trace';


storiesOf('TraceListItem', module)
  .add('default', () => (
    <TraceListItem
      trace={simple}
      onSelect={console.debug}>
    </TraceListItem>
  ));
