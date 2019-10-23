import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from '~/containers/TraceList';
import Mock from 'storybook/Mock';
import {simple} from 'tests/mocks/trace';


storiesOf('TraceList', module)
  .add('default', () => {
    const traces = new Map([
      ["aaa", {...simple, id: 'aaa'},],
      ["bbb", {...simple, id: 'bbb'},],
    ]);
    return (
      <Component 
        traces={traces}
        Child={Mock}
      />
    );
  });
