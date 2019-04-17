import { storiesOf } from '@storybook/vue';
import { base } from 'paths.macro';
import Component from '.';

storiesOf(base, module)
  .add('simple', () => ({
    render(h) {
      return (
        <Component/>
      );
    },
  }))
  .add('scatter', () => ({
    render(h) {
      const data = [
        {
          x: [0, 1, 2],
          y: [6, 10, 2],
          error_y: {
            type: 'data',
            array: [1, 2, 3],
            visible: true,
          },
          type: 'scatter',
        },
      ];
      return (
        <Component
          data={data}
        />
      );
    },
  }))
  .add('mulit', () => ({
    render(h) {
      const trace1 = {
        x: [1, 2, 3, 4, 5],
        y: [1, 6, 3, 6, 1],
        mode: 'markers',
        type: 'scatter',
        name: 'Team A',
        text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
        marker: { size: 12 },
      };

      const trace2 = {
        x: [1.5, 2.5, 3.5, 4.5, 5.5],
        y: [4, 1, 7, 1, 4],
        mode: 'markers',
        type: 'scatter',
        name: 'Team B',
        text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'],
        marker: { size: 12 },
      };

      const data = [trace1, trace2];
      return (
        <Component
          data={data}
        />
      );
    },
  }));
