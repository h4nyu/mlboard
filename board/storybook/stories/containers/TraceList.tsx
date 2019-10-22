import React from 'react';
import { storiesOf } from '@storybook/react';
import TraceList from '~/containers/TraceList';
import Mock from 'storybook/Mock';
import {simple} from '/srv/tests/mocks/trace';
import {Map} from 'immutable';


storiesOf('TraceList', module)
  .add('default', () => {
    const traceMap = Map({
      "aaa": simple,
      "bbb": simple,
    });
    return (
      <TraceList
        traceMap={traceMap}
        Child={() => <Mock/>}
      />
    );
  });
