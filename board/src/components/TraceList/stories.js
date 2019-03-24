import { storiesOf } from '@storybook/vue';
import moment from 'moment';
import TraceList from './index.js';

storiesOf('TraceList', module)
  .add('default', () => ({
    render(h) {
      return (
        <TraceList />
      );
    },
  }));
