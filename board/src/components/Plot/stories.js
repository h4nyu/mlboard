import { storiesOf } from '@storybook/vue';
import { base } from 'paths.macro';
import Component from '.';

storiesOf(base, module)
  .add('simple', () => ({
    render() {
      return (
        <Component/>
      );
    },
  }))
  .add('scatter', () => ({
    render() {
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
  .add('scattergl', () => ({
    render(h) {
      function gaussianRand() {
        let rand = 0;
        for (let i = 0; i < 6; i += 1) {
          rand += Math.random();
        }
        return (rand / 6) - 0.5;
      }

      const X = [];
      const Y = [];
      const n = 100000;
      let i;

      for (i = 0; i < n; i += 1) {
        X.push(gaussianRand());
        Y.push(gaussianRand());
      }

      const data = [{
        type: 'scattergl',
        mode: 'markers',
        marker: {
          line: {
            width: 1,
            color: 'rgb(0,0,0)',
          },
        },
        x: X,
        y: Y,
      }];
      return (
        <Component
          data={data}
        />
      );
    },
  }));
