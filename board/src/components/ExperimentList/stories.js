import { storiesOf } from '@storybook/vue';
import * as ms from '@/services/models';
import uuid from 'uuid';
import moment from 'moment';
import { base } from 'paths.macro';
import Component from '.';

storiesOf(base, module)
  .add('default', () => ({
    render() {
      const experiment0 = new ms.Experiment({
        id: uuid(),
        tag: 'aaa',
        config: {
          foo: 'foo',
          bar: 'bar',
        },
      });
      const experiment1 = new ms.Experiment({
        id: uuid(),
        tag: 'bbb',
        config: {
          foo: 'baz',
          bar: 'sfsd',
        },
      });

      const experimentSet = {
        [experiment0.id]: experiment0,
        [experiment1.id]: experiment1,
      };

      const selectedIds = [experiment0.id];

      return (
        <Component
          experimentSet={experimentSet}
          selectedIds={selectedIds}
        />
      );
    },
  }));
