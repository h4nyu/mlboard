import { storiesOf } from '@storybook/vue';
import * as ms from '@/services/models';
import uuid from 'uuid';
import moment from 'moment';
import { base } from 'paths.macro';
import Component from '.';

storiesOf(base, module)
  .add('default', () => ({
    render() {
      const traceGroup = {
        name: "train/iou",
        traceIds: [1, 2, 3],
      }
      return (
        <Component
          name={traceGroup.name}
          traceIds={traceGroup.traceIds}
          vOn:select={x => alert(`click, ${JSON.stringify(x)}`)}
        />
      );
    },
  }));
