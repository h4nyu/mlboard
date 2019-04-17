import { storiesOf } from '@storybook/vue';
import { base } from 'paths.macro';
import Component from '.';

storiesOf(base, module)
  .add('simple', () => ({
    render(h) {
      return (
        <Component/>
      );
    },
  }))
  .add('placeholder', () => ({
    render(h) {
      return (
        <Component
          placeholder={'some text'}
        />
      );
    },
  }))
