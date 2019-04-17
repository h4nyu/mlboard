import { storiesOf } from '@storybook/vue';
import moment from 'moment';
import Component from '.';
import { base } from 'paths.macro';

storiesOf(base, module)
  .add('selected', () => ({
    render() {
      return (
        <Component isSelected={true}>
          <div> content here !</div>
        </Component>
      );
    },
  }))
  .add('unselected', () => ({
    render() {
      return (
        <Component isSelected={false}>
          <div> content here !</div>
        </Component>
      );
    },
  }));
