import React from 'react';
import { storiesOf } from '@storybook/react';
import TraceList from '~/containers/TraceList';
import Mock from 'storybook/Mock';
import {IProps} from '~/connectors/TraceListItem';
import {simple} from '/srv/tests/mocks/trace';
import {Map} from 'immutable';


storiesOf('TraceList', module)
  .add('default', () => {
    const traceSet = Map({
      "aaa": simple,
      "bbb": simple,
    });
    return (
      <TraceList
        traceSet={traceSet}
        Child={(props:IProps) => <Mock/>}
      />
    )
  })
