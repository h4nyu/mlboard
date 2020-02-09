import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { ITransition } from '~/models/interfaces'; 
import Component from '~/components/Transition';
import {transition, trace, workspace } from 'tests/mocks/models';
import { Map } from 'immutable';
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
const workspaces = Map({
  [workspace.id]:{
    ...workspace,
  }
})

const traces = Map({
  [transition.traceId]: {
    ...trace,
    workspaceId: workspace.id
  },
});
storiesOf('Transition', module)
  .add('default', () => {
    const segments = Map([
      [transition.id, points],
    ]);
    return (
      <Component 
        transition={{
          ...transition,
          isDatetime: boolean('isDatetime', false),
          isLog: boolean('isLog', false),
          smoothWeight: number('smoothWeight', 0.5),
        }}
        workspaces={workspaces}
        segments={segments}
        traces={traces}
        onWeightChange={action('onWeightChange')}
        onRangeChange={action('onRangeChange')}
        onClose={action('onClose')}
        onIsLogChange={action('onIsLogChange')}
        onIsDatetimeChange={action('onIsDatetimeChange')}
      />
    );
  })
  .add('empty', () => {
    const segments = Map([
      [transition.id, []],
    ]);
    return (
      <Component 
        transition={{
          ...transition,
          isDatetime: boolean('isDatetime', false),
          isLog: boolean('isLog', false),
          smoothWeight: number('smoothWeight', 0.5),
        }}
        workspaces={workspaces}
        segments={segments}
        traces={traces}
        onWeightChange={action('onWeightChange')}
        onRangeChange={action('onRangeChange')}
        onClose={action('onClose')}
        onIsLogChange={action('onIsLogChange')}
        onIsDatetimeChange={action('onIsDatetimeChange')}
      />
    );
  })
