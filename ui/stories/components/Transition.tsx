import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { Transition } from '~/models'; 
import Component from '~/components/Transition';
import {transition, trace } from 'tests/mocks/models';
import { Map, Set } from 'immutable';
import { boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Trace } from '~/models';

const points = [
  {
    value: 2.111,
    ts: moment('2015-01-01'), 
  },
  {
    value: 2.113,
    ts: moment('2015-01-02'),
  },
  {
    value: 2.112,
    ts: moment('2015-01-03'),
  },
  {
    value: 2.1121213123,
    ts: moment('2015-01-04'),
  },
];

storiesOf('Transition', module)
  .add('default', () => {
    const traces:Map<string,Trace> = Map({
      "t0": {
        id: "t0",
        name: "trace0",
        createdAt: moment(),
        updatedAt: moment(),
      }
    });
    return (
      <Component 
        transition={{
          ...transition,
            traceId:"t0",
            isDatetime: boolean('isDatetime', false),
            isLog: boolean('isLog', false),
            smoothWeight: number('smoothWeight', 0.5),
            points: points,
        }}
        traces={traces}
        onWeightChange={action('onWeightChange')}
        onRangeChange={action('onRangeChange')}
        onClose={action('onClose')}
        onIsLogChange={action('onIsLogChange')}
        onIsDatetimeChange={action('onIsDatetimeChange')}
      />
    );
  })
