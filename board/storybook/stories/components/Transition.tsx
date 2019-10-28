import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import Component from '~/components/Transition';
import {transition, trace } from 'tests/mocks/models';

storiesOf('Transition', module)
  .add('default', () => {
    const points = [
      {
        value: 19.0,
        ts: moment('2015-01-01'),
      },
      {
        value: 19.0,
        ts: moment('2015-01-02'),
      },
    ]
    const segments = new Map([
      [transition.id, points],
    ]);
    const traces = new Map([
      [transition.traceId, trace],
    ])
    return (
      <Component 
        transition={transition}
        segments={segments}
        traces={traces}
      />
    );
  });
