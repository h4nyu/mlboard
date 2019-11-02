import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { ITransition } from '~/models/interfaces'; 
import Component from '~/components/Transition';
import {transition, trace } from 'tests/mocks/models';
import { Map } from 'immutable';

const points = [
  {
    value: 19.0,
    ts: moment('2015-01-01'),
  },
  {
    value: 20.0,
    ts: moment('2015-01-02'),
  },
  {
    value: 15.0,
    ts: moment('2015-01-03'),
  },
];

const segments = Map([
  [transition.id, points],
]);
const traces = Map([
  [transition.traceId, trace],
]);
const TargetComponent = (props: {transition: ITransition}) => (
  <Component 
    transition={props.transition}
    segments={segments}
    traces={traces}
    onClose={(x) => console.debug(x)}
    onIsLogChange={(x) => console.debug(x)}
    onIsDatetimeChange={(x) => console.debug(x)}
    onIsScatterChange={(x) => console.debug(x)}
  />
);

storiesOf('Transition', module)
  .add('default', () => {
    return (
      <TargetComponent
        transition={transition}
      />
    );
  })
  .add('isDatetime', () => {
    return (
      <TargetComponent 
        transition={{
          ...transition,
          isDatetime: true,
        }}
      />
    );
  })
  .add('isScatter', () => {
    return (
      <TargetComponent 
        transition={{
          ...transition,
          isScatter: true,
        }}
      />
    );
  });
