import { storiesOf } from '@storybook/vue';
import * as ms from '@/services/models';
import uuid from 'uuid';
import moment from 'moment';
import { base } from 'paths.macro';
import Component from '.';

storiesOf(base, module)
  .add('default', () => ({
    render() {
      const trace0 = {
        id: uuid(),
      }
      const trace1 = {
        id: uuid(),
      }
      const traceSet = {
        [trace0.id]: trace0,
        [trace1.id]: trace1,
      }
      const group0 = {
        id: uuid(),
        name: 'loss/val',
        traceIds: [trace0, trace1],
      }

      const traceGroupSet = {
        [group0.id]: group0,
      };

      return (
        <Component
          traceGroupSet={traceGroupSet}
          vOn:select={x => alert(`select, ${JSON.stringify(x)}`)}
        />
      );
    },
  }));
