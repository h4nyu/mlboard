import { storiesOf } from '@storybook/vue';
import * as ms from '@/services/models';
import uuid from 'uuid';
import moment from 'moment';
import { base } from 'paths.macro';
import Component from '.';
import {sample} from "../TracePlot/stories.js";

storiesOf(base, module)
  .add('default', () => ({
    render() {
      const traceGroups = [
        sample.traceGroup
      ]
      const dummy = {
        ...sample,
        traceGroups
      }
      return (
        <Component
          traceGroups={dummy.traceGroups}
          tracePointSet={dummy.tracePointSet}
          experimentSet={dummy.experimentSet}
          traceSet={dummy.traceSet}
          vOn:select={x => alert(`select, ${JSON.stringify(x)}`)}
        />
      );
    },
  }));
