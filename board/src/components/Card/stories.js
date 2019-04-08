import { storiesOf } from '@storybook/vue';
import Card from './index.js';

storiesOf('Card', module)
  .add('default', () => ({
    render() {
      return (
        <Card />
      );
    },
  }));
