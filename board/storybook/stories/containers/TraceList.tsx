import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from '~/containers/TraceList';
import { Map } from 'immutable';
import Mock from 'storybook/Mock';
import {trace} from 'tests/mocks/models';


storiesOf('TraceList', module)
  .add('default', () => {
    const traces = Map([
      ["aaa", {...trace, id: 'aaa'},],
      ["bbb", {...trace, id: 'bbb'},],
    ]);
    return (
      <Component 
        traces={traces}
        Child={Mock}
      />
    );
  });
