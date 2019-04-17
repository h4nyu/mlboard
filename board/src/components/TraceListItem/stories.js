import { storiesOf } from '@storybook/vue';
import * as ms from '@/services/models';
import moment from 'moment';
import uuid from 'uuid';
import { base } from 'paths.macro';
import TraceListItem from '.';

storiesOf(base, module)
  .add('default', () => ({
    render() {
      const traces = [
        new ms.Trace().fromRes({
          y: 0.1,
          x: 1,
          ts: moment().format(),
          infoId: uuid(),
        }),
        new ms.Trace().fromRes({
          y: 0.2,
          x: 2,
          ts: moment().format(),
          infoId: uuid(),
        }),
      ];
      return (
        <TraceListItem
          traces={traces}
        />
      );
    },
  }));
