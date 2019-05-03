import { storiesOf } from '@storybook/vue';
import * as ms from '@/services/models';
import uuid from 'uuid';
import moment from 'moment';
import { base } from 'paths.macro';
import Component from '.';

storiesOf(base, module)
  .add('default', () => ({
    render() {
      const experiment = new ms.Experiment({
        id: uuid(),
        name: 'test-name',
        score: 0.888,
        config: {
          foo: 'foo',
          bar: 'bar',
        },
        createDate: moment().format(),
      });
      return (
        <Component
          experiment={experiment}
          vOn:scoreClick={x => alert(`scoreClick, ${JSON.stringify(x)}`)}
          vOn:deleteClick={x => alert(`deleteClick, ${JSON.stringify(x)}`)}
          vOn:chartClick={x => alert(`chartClick, ${JSON.stringify(x)}`)}
        />
      );
    },
  }))
  .add('no-score', () => ({
    render() {
      const experiment = new ms.Experiment({
        id: uuid(),
        name: 'test-name',
        config: {
          foo: 'foo',
          bar: 'bar',
        },
        createDate: moment().format(),
      });
      return (
        <Component
          experiment={experiment}
          vOn:deleteClick={x => alert(`deleteClick, ${JSON.stringify(x)}`)}
          vOn:scoreClick={x => alert(`scoreClick, ${JSON.stringify(x)}`)}
          vOn:chartClick={x => alert(`chartClick, ${JSON.stringify(x)}`)}
        />
      );
    },
  }));
