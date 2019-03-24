import { storiesOf } from '@storybook/vue';
import moment from 'moment';
import Card from './index.js';

storiesOf('Card', module)
  .add('default', () => ({
    render(h) {
      return (
        <Card />
      );
    },
  }));
