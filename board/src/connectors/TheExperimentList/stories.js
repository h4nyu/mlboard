import { storiesOf } from '@storybook/vue';
import * as ms from '@/services/models';
import uuid from 'uuid';
import moment from 'moment';
import Component from '.';
import { base } from 'paths.macro';
import store from '@/store';

storiesOf(base, module)
  .add('default', () => ({
    store,
    mounted() {
      const experiment = new ms.Experiment({
        id: uuid(),
        tag: 'bbb',
        config: {
          foo: 'baz',
          bar: 'sfsd',
        },
      });
      this.$store.state.experiment.experimentSet = {
        [experiment.id]: experiment,
      };
    },
    render() {
      return (
        <Component />
      );
    },
  }));
