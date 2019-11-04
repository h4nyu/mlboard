import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from '~/containers/Workspace';
import Mock from 'storybook/Mock';
import {workspace} from 'tests/mocks/models';


storiesOf('Workspace', module)
  .add('default', () => {
    return (
      <Component 
        workspace={workspace}
        Child={Mock}
      />
    );
  });
