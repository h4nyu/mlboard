import { storiesOf } from '@storybook/vue'
import * as ms from '@/services/models';
import TraceListItem from './index.js'
import moment from "moment";
import uuid from "uuid";

storiesOf('TraceListItem', module)
  .add('default', () => ({
    render(h) {
      const traces = [
        new ms.Trace().fromRes({
          y: 0.1,
          x: 1,
          ts: moment().format(),
          infoId:uuid(),
        }),
        new ms.Trace().fromRes({
          y: 0.2,
          x: 2,
          ts: moment().format(),
          infoId:uuid(),
        })
      ]
      return (
        <TraceListItem 
          traces={traces}
        />
      )
    }
  }))
