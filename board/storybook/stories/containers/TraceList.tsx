import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from '~/containers/TraceList';
import { Map } from 'immutable';
import Mock from 'storybook/Mock';
import {trace, workspace} from 'tests/mocks/models';


storiesOf('TraceList', module)
  .add('default', () => {
    const workspaceMock = {...workspace, id:'a'}
    const traces = Map([
      ["aaa", {...trace, id: 'aaa', workspaceId:'a'},],
      ["bbb", {...trace, id: 'bbb'},],
    ]);
    return (
      <Component 
        workspace={workspaceMock}
        traces={traces}
        keyword={'aaaa'}
        onInput={console.debug}
        Child={Mock}
      />
    );
  });
