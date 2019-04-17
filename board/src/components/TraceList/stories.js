import { storiesOf } from '@storybook/vue';
import moment from 'moment';
import TraceList from './index.js';
import { base } from 'paths.macro';

storiesOf(base, module)
  .add('default', () => ({
    render() {
      return (
        <TraceList />
      );
    },
  }));
