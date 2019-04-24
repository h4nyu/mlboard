import { storiesOf } from '@storybook/vue';
import Component from '.';
import { base } from 'paths.macro';
import store from '@/store';

storiesOf(base, module)
  .add('default', () => ({
    store,
    render() {
      return (
        <Component />
      );
    },
  }));


