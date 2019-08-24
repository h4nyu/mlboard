import React from 'react';
import { storiesOf } from '@storybook/react';
import TransitionList from '~/containers/TransitionList';
import {IProps as IChildProps} from '~/components/TransitionPlot';
import {Mock} from 'storybook/Mock';
import {simple} from '/srv/tests/mocks/trace';
import {Map} from 'immutable';


const ChildMock: React.FC<IChildProps> = props => (
  <Mock />
)



storiesOf('TransitionList', module)
  .add('default', () => {
    const traceMap = Map({
      "aaa": simple,
      "bbb": simple,
    });
    return (
      <TransitionList
        traceMap={traceMap}
        Child={ChildMock}
      />
    );
  });
