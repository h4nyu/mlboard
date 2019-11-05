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
    value: 19.0,
    ts: moment('2015-01-01'), },
  {
    value: 20.0,
    ts: moment('2015-01-02'),
  },
  {
    value: 15.0,
    ts: moment('2015-01-03'),
  },
];
const workspaces = Map({
  [workspace.id]:{
    ...workspace,
  }
})

const segments = Map([
  [transition.id, points],
]);
const traces = Map({
  [transition.traceId]: {
    ...trace,
    workspaceId: workspace.id
  }
});
storiesOf('Transition', module)
  .add('default', () => {
    return (
      <Component 
        transition={{
          ...transition,
          isDatetime: boolean('isDatetime', false),
          isScatter: boolean('isScatter', false),
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
        onIsScatterChange={action('onIsScatterChange')}
      />
    );
  })
