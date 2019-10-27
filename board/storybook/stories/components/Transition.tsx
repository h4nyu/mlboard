import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import Component from '~/components/Transition';
import {transition } from 'tests/mocks/models';

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
    return (
      <Component 
        transition={transition}
        points={points}
      />
    );
  });
