import React from 'react';
import { storiesOf } from '@storybook/react';
import Search from '~/components/Search';
import { action } from '@storybook/addon-actions';
import {trace} from 'tests/mocks/models';

import { Map } from 'immutable';

const traces = Map({
  "a" : trace,
  "b" : trace,
})

storiesOf('Search', module)
  .add('default', () => (
    <Search
      defaultValue={"aaa"}
      traces={traces}
      onInput={action('onInput')}
    />
  ))
  .add('default', () => (
    <div>
      <Search
        defaultValue={"aaa"}
        traces={traces}
        onInput={action('onInput')}
      />
      <div>aaa</div>
    </div>
  ))
