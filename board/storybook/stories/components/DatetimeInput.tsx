import React from 'react';
import moment from 'moment'
import { storiesOf } from '@storybook/react';
import DatetimeInput from '~/components/DatetimeInput';
import {Map} from 'immutable';


storiesOf('DatetimeInput', module)
  .add('default', () => {
    const date = moment().format()

    return (
      <DatetimeInput
        value={date}
        onChange={console.debug}
      />
    );
  });

