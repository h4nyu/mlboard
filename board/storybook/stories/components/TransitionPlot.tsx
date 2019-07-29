import React from 'react';
import { storiesOf } from '@storybook/react';
import { TransitionPlot } from '~/components/TransitionPlot';
import {simple as transitionMock} from 'tests/mocks/transition';
import {simple as tracesSegmentMock} from 'tests/mocks/traceSegment';
import {simple as traceMock} from 'tests/mocks/trace';
import {Map} from 'immutable';


storiesOf('TransitionPlot', module)
  .add('default', () => {
    const transition = {
      ...transitionMock,
      traceSegmentId: 'aaa',
      traceId: 'aaa'
    }
    const traceSegmentMap = Map({
      'aaa': tracesSegmentMock
    })
    const traceMap= Map({
      'aaa': traceMock
    })

    return (
      <TransitionPlot
        transition={transition}
        traceSegmentMap={traceSegmentMap}
        traceMap={traceMap}
      />
    )
  });

