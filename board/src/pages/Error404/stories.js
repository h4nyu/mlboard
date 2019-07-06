import { storiesOf } from '@storybook/vue';
import Component from './index.js';
import { base } from 'paths.macro';
import store from '@/store';

storiesOf(base, module)
  .add('default', () => ({
    store,
    render() {
      return (
        <Component/>
      );
    },
  }));
