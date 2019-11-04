import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from '~/containers/WorkspaceList';
import { Map } from 'immutable';
import Mock from 'storybook/Mock';
import {workspace} from 'tests/mocks/models';


storiesOf('WorkspaceList', module)
  .add('default', () => {
    const rows = Map({
      "aaa": {...workspace, id: 'aaa'},
    });
    return (
      <Component 
        workspaces={rows}
        keyword={'aaaa'}
        onInput={console.debug}
        Child={Mock}
      />
    );
  });
