import { storiesOf } from '@storybook/vue';
import Card from './index.js';
import { base } from 'paths.macro';

storiesOf(base, module)
  .add('default', () => ({
    render() {
      return (
        <Card />
      );
    },
  }));
