import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from '~/containers/TransitionList';
import { Map } from 'immutable';
import Mock from 'stories/Mock';
import {transition} from 'tests/mocks/models';
import { action } from '@storybook/addon-actions';


storiesOf('TransitionList', module)
  .add('default', () => {
    const rows = Map([
      ["aaa", {...transition, id: 'aaa'},],
      ["bbb", {...transition, id: 'bbb'},],
    ]);
    return (
      <Component 
        transitions={rows}
        onAddClick={action("onAddClick")}
        Child={(props) => <Mock name={transition.id} />}
      />
    );
  });

