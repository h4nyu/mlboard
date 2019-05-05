import { storiesOf } from '@storybook/vue';
import * as ms from '@/services/models';
import uuid from 'uuid';
import moment from 'moment';
import { base } from 'paths.macro';
import Component from '.';

storiesOf(base, module)
  .add('default', () => ({
    render() {
      const metric0 = {
        id: uuid(),
        name: 'loss/val'
      }
      const metric1 = {
        id: uuid(),
        name: 'loss/train'
      }
      const metric2 = {
        id: uuid(),
        name: 'loss/val'
      }

      const metricSet = {
        [metric0.id]: metric0,
        [metric1.id]: metric1,
        [metric2.id]: metric2,
      };

      const selectedIds = [metric1.id];

      return (
        <Component
          traceSet={metricSet}
          selectedIds={selectedIds}
          vOn:select={x => alert(`select, ${JSON.stringify(x)}`)}
        />
      );
    },
  }));
