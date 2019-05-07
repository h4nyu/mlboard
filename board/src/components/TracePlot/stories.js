import { storiesOf } from '@storybook/vue';
import Component from '.';
import { base } from 'paths.macro';
import store from '@/store';
import moment from "moment";
import uuid from "uuid";
import TracePoint from '@/services/models/TracePoint';
import TraceGroup from '@/services/models/TraceGroup';
import Trace from '@/services/models/Trace';
import Experiment from '@/services/models/Experiment';

storiesOf(base, module)
  .add('default', () => ({
    store,
    render() {
      const traceId = uuid()
      const tracePointSet = {
        [traceId]: [
          new TracePoint({
            x: 1,
            y: 1,
            ts: moment("2000-01-01").format(),
            traceId,
          }),
          new TracePoint({
            x: 2,
            y: 2,
            ts: moment("3000-01-01").format(),
            traceId,
          }),
        ]
      }

      const traceGroupe = new TraceGroup({
        id: uuid(),
        name: "foo",
        traceIds: [traceId],
      });

      const experimentId = uuid()
      const traceSet = {
        [traceId]: new Trace({
          id: traceId,
          name: 'foo',
          experimentId,
        })
      };

      const experimentSet = {
        [experimentId]: new Experiment({
          id: experimentId,
          name: 'experiment name',
        })
      }

      return (
        <Component 
          tracePointSet={tracePointSet}
          traceGroupe={traceGroupe}
          traceSet={traceSet}
          experimentSet={experimentSet}
        />
      );
    },
  }));


