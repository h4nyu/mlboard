import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { Transition, Segment, Trace } from '~/models'; 
import Component from '~/components/Transition';
import {transition, trace, segment } from 'tests/mocks/models';
import { Map, Set } from 'immutable';
import { boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

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
    const segments :  Map<string, Segment> = Map({
      [segment.id]: {
        ...segment,
        points: points
      }
    })
    return (
      <Component 
        selectedId={transition.id}
        transition={{
          ...transition,
            traceId:"t0",
            isDatetime: boolean('isDatetime', false),
            isLog: boolean('isLog', false),
            smoothWeight: number('smoothWeight', 0.5),
            segmentIds: [segment.id]
        }}
        segments={segments}
        traces={traces}
        onWeightChange={action('onWeightChange')}
        onRangeChange={action('onRangeChange')}
        onLegendCLick={action('onLegendCLick')}
        onClick={action('onClick')}
        onClose={action('onClose')}
        onIsLogChange={action('onIsLogChange')}
        onIsSyncChange={action('onIsSyncChange')}
        onIsDatetimeChange={action('onIsDatetimeChange')}
      />
    );
  })
