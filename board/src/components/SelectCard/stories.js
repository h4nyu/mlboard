import { storiesOf } from '@storybook/vue';
import moment from 'moment';
import { base } from 'paths.macro';
import SelectCard from '.';

storiesOf(base, module)
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
