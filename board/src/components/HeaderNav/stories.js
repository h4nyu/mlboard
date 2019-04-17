import { storiesOf } from '@storybook/vue';
import Component from '.';
import { base } from 'paths.macro';

storiesOf(base, module)
  .add('default', () => ({
    render() {
      return (
        <Component />
      );
    },
  }));


