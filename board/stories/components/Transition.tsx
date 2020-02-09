import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { ITransition } from '~/models/interfaces'; 
import Component from '~/components/Transition';
import {transition, trace, workspace } from 'tests/mocks/models';
import { Map, Set } from 'immutable';
import { boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ITrace, ISegment } from '~/models/interfaces';

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

const traces:Map<string,ITrace> = Map();
storiesOf('Transition', module)
  .add('default', () => {
    const segments:Map<string,ISegment> = Map();
    const relations = Set();
    return (
      <Component 
        currentId={""}
        transition={{
          ...transition,
          isDatetime: boolean('isDatetime', false),
          isLog: boolean('isLog', false),
          smoothWeight: number('smoothWeight', 0.5),
        }}
        relations={relations}
        workspaces={workspaces}
        segments={segments}
        traces={traces}
        onClick={action('onClick')}
        onWeightChange={action('onWeightChange')}
        onRangeChange={action('onRangeChange')}
        onClose={action('onClose')}
        onIsLogChange={action('onIsLogChange')}
        onIsDatetimeChange={action('onIsDatetimeChange')}
      />
    );
  })
