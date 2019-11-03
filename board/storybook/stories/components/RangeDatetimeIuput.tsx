import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import RangeDatetimeInput from '~/components/RangeDatetimeInput';


storiesOf('RangeDatetimeInput', module)
  .add('default', () => {
    return (
      <RangeDatetimeInput
        fromDate={moment()}
        toDate={moment().add(1,'hours')}
        onFromDateChange={console.debug}
        onToDateChange={console.debug}
      />
    );
  });

