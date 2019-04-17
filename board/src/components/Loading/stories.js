import { storiesOf } from '@storybook/vue';
import { base } from 'paths.macro';
import Component from '.';

storiesOf(base, module)
  .add('pendingNum 0', () => ({
    render(h) {
      return (
        <Component
          pendingNum={0}
        />
      );
    },
  }))
  .add('pendingNum 1', () => ({
    render(h) {
      return (
        <Component
          pendingNum={1}
        />
      );
    },
  }))

