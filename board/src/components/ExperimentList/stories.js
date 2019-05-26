import { storiesOf } from '@storybook/vue';
import * as ms from '@/services/models';
import uuid from 'uuid';
import moment from 'moment';
import { base } from 'paths.macro';
import Component from '.';

storiesOf(base, module)
  .add('default', () => ({
    render() {
      const experiment0 = {
        id: uuid(),
        name: 'aaa',
        score:0.777,
        config: {
          foo: 'foo',
          bar: 'bar',
        },
        createDate: moment("2018-01-01"),
      };
      const experiment1 = {
        id: uuid(),
        name: 'bbb',
        config: {
          foo: 'baz',
          bar: 'sfsd',
        },
        createDate: moment("2019-01-01"),
      };
      const experiment2 = {
        id: uuid(),
        name: 'ccc',
        score: 0.222,
        config: {
          foo: 'baz',
          bar: 'sfsd',
        },
        createDate: moment("2020-01-01"),
      };

      const experimentSet = {
        [experiment0.id]: experiment0,
        [experiment1.id]: experiment1,
        [experiment2.id]: experiment2,
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
