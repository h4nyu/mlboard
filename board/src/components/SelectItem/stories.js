import { storiesOf } from '@storybook/vue';
import moment from 'moment';
import Component from '.';

storiesOf(`${Component.name}`, module)
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
