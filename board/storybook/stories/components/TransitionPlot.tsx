import React from 'react';
import { storiesOf } from '@storybook/react';
import { TransitionPlot } from '~/components/TransitionPlot';
import {simple as traceMock} from 'tests/mocks/trace';


storiesOf('TransitionPlot', module)
  .add('default', () => {
    const trace = {
      ...traceMock,
    };

    return (
      <TransitionPlot
        trace={trace}
      />
    );
  });

