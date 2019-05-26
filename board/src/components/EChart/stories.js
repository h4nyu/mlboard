import { storiesOf } from '@storybook/vue';
import { base } from 'paths.macro';
import Component from '.';

storiesOf(base, module)
  .add('simple', () => ({
    render() {
      const option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }],
      };

      return (
        <Component
          option={ option }
          style="width: 100%;height:400px;"
        />
      );
    },
  }))
