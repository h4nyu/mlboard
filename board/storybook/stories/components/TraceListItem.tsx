import React from 'react';
import { storiesOf } from '@storybook/react';
import TraceListItem from '~/components/TraceListItem';
import {simple} from '/srv/tests/mocks/trace';


storiesOf('TraceListItem', module)
  .add('default', () => (
    <TraceListItem
      trace={simple}
      onSelect={(traceId:string) => {console.log}}>
    </TraceListItem>
  ))
