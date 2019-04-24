import { storiesOf } from '@storybook/vue';
import * as ms from '@/services/models';
import uuid from 'uuid';
import moment from 'moment';
import { base } from 'paths.macro';
import Component from '.';

storiesOf(base, module)
  .add('default', () => ({
    render() {
      const trace = {
        name: "train/iou",
      }
      return (
        <Component
          trace={trace}
          value={1.3}
        />
      );
    },
  }));
