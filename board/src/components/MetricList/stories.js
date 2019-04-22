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

      const metricSet = {
        [metric0.id]: metric0,
        [metric1.id]: metric1,
      };

      const selectedIds = [metric1.id];

      return (
        <Component
          metricSet={metricSet}
          selectedIds={selectedIds}
        />
      );
    },
  }));
