import { storiesOf } from '@storybook/vue';
import * as ms from '@/services/models';
import uuid from 'uuid';
import moment from 'moment';
import Component from '.';

storiesOf(`${Component.name}`, module)
  .add('default', () => ({
    render() {
      const experimentSet = [
        new ms.Experiment({
          id: uuid(),
          tag: 'aaa',
          config: {
            foo: 'foo',
            bar: 'bar',
          },
        }),
        new ms.Experiment({
          id: uuid(),
          tag: 'bbb',
          config: {
            foo: 'baz',
            bar: 'sfsd',
          },
        }),
      ];
      const selectedIds = [experiments[0].id];
      return (
        <Component
          experimentSet={experimentSet}
          selectedIds={selectedIds}
          vOn:refresh={x => alert('refresh')}
          vOn:deleteClick={x => alert(`deleteClick, ${JSON.stringify(x)}`)}
        />
      );
    },
  }));
