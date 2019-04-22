import { storiesOf } from '@storybook/vue';
import * as ms from '@/services/models';
import { base } from 'paths.macro';
import Component from '.';

storiesOf(base, module)
  .add('default', () => ({
    render() {
      const levels = [
        'foo',
        'bar'
      ]
      return (
        <Component
          levels={levels}
        />
      );
    },
  }));

