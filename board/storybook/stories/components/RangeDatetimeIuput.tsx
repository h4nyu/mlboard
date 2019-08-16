import React from 'react';
import moment from 'moment'
import { storiesOf } from '@storybook/react';
import RangeDatetimeInput from '~/components/RangeDatetimeInput';
import {Map} from 'immutable';


storiesOf('RangeDatetimeInput', module)
  .add('default', () => {
    return (
      <RangeDatetimeInput
        fromDate={moment().format()}
        toDate={moment().add(1,'hours').format()}
        onFromDateChange={console.debug}
        onToDateChange={console.debug}
      />
    );
  });

