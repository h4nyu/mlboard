import { storiesOf } from '@storybook/vue';
import moment from 'moment';
import SelectCard from '.';

storiesOf('SelectCard', module)
  .add('selected', () => ({
    render(h) {
      return (
        <SelectCard isSelected={true}>
          <div> content here !</div>
        </SelectCard>
      );
    },
  }))
  .add('unselected', () => ({
    render(h) {
      return (
        <SelectCard isSelected={false}>
          <div> content here !</div>
        </SelectCard>
      );
    },
  }));
