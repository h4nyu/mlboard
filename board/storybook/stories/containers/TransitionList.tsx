import React from 'react';
import { storiesOf } from '@storybook/react';
import TransitionList from '~/containers/TransitionList';
import Mock from 'storybook/Mock';
import {simple} from '/srv/tests/mocks/transition';
import {Map} from 'immutable';


storiesOf('TransitionList', module)
  .add('default', () => {
    const transitionMap = Map({
      "aaa": simple,
      "bbb": simple,
    });
    return (
      <TransitionList
        transitionMap={transitionMap}
        Child={() => <Mock/>}
      />
    );
  });
