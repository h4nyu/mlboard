import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from '~/containers/Workspace';
import Mock from 'stories/Mock';
import {workspace} from 'tests/mocks/models';
import { object } from '@storybook/addon-knobs';


storiesOf('Workspace', module)
  .add('default', () => {
    return (
      <Component 
        workspace={workspace}
        Child={Mock}
      />
    );
  });
