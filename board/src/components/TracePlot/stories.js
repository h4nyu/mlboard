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

const traceId0 = uuid()
const traceId1 = uuid()
const tracePointSet = {
  [traceId0]: [
    {
      x: 1,
      y: 1,
      ts: moment("2000-01-01").format(),
    },
    {
      x: 2,
      y: 2,
      ts: moment("3000-01-01").format(),
    },
  ],
  [traceId1]: [
    {
      x: 1,
      y: 0,
      ts: moment("2000-01-01").format(),
    },
    {
      x: 2,
      y: 1,
      ts: moment("3000-01-01").format(),
    },
  ]
}

const traceGroup = {
  id: uuid(),
  name: "foo",
  traceIds: [traceId0, traceId1],
};

const experimentId0 = uuid()
const experimentId1 = uuid()
const traceSet = {
  [traceId0]: {
    id: traceId0,
    name: 'trace0',
    experimentId: experimentId0,
  },
  [traceId1]: {
    id: traceId1,
    name: 'trace1',
    experimentId: experimentId1,
  }
};

const experimentSet = {
  [experimentId0]: {
    id: experimentId0,
    name: 'experiment name0',
  },
  [experimentId1]: {
    id: experimentId1,
    name: 'experiment name1',
  }
}
export const sample = {
  tracePointSet,
  traceGroup,
  tracePointSet,
  experimentSet,
  traceSet,
}

storiesOf(base, module)
  .add('default', () => ({
    store,
    render() {

      return (
        <Component 
          tracePointSet={tracePointSet}
          traceGroup={traceGroup}
          traceSet={traceSet}
          experimentSet={experimentSet}
        />
      );
    },
  }));


