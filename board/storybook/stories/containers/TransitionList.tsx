import React from 'react';
import { storiesOf } from '@storybook/react';
import TransitionList from '~/containers/TransitionList';
import {Mock} from 'storybook/Mock';
import {simple} from '/srv/tests/mocks/trace';
import {Map} from 'immutable';


storiesOf('TransitionList', module)
  .add('default', () => {
    const traceMap = Map({
      "aaa": simple,
      "bbb": simple,
    });
    return (
      <TransitionList
        traceMap={traceMap}
        Child={() => <Mock/>}
      />
    );
  });
