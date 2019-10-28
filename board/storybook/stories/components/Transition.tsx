import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import Component from '~/components/Transition';
import {transition, trace } from 'tests/mocks/models';
import { Map } from 'immutable';

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
    ];
    const segments = Map([
      [transition.id, points],
    ]);
    const traces = Map([
      [transition.traceId, trace],
    ]);
    return (
      <Component 
        transition={transition}
        segments={segments}
        traces={traces}
        onClose={(x) => console.debug(x)}
      />
    );
  });
