import Card from '@/components/Card';
import Plot from '@/components/Plot';
import { ToggleButton } from 'vue-js-toggle-button';


export default {
  name: 'TraceListItem',
  props: {
    traces: { type: Array, default: () => ([]) },
    xAixs: { type: String, default: () => 'Timestamp' },
  },
  data() {
    return {
      isLog: false,
    };
  },
  methods: {
    handleCheck(checkedValue) {
      this.isLog = checkedValue;
    },
  },
  computed: {
    plotData() {
      let x = [];
      if (this.xAixsType === 'DATE') {
        x = this.traces.map(t => t.ts);
      } else {
        x = this.traces.map(t => t.x);
      }
      return [
        {
          x,
          y: this.traces.map(t => t.y),
          mode: 'markers+lines',
          type: 'scatter',
        },
      ];
    },
    yaxisType() {
      if (this.isLog) {
        return 'log';
      }
      return 'liner';
    },
    plotLayout() {
      return {
        showlegend: true,
        margin: {
          r: 0,
          t: 40,
          b: 20,
          l: 20,
        },
        autosize: true,
        yaxis: {
          type: this.yaxisType,
        },
      };
    },
  },
  render: function render(h) {
    return (
      <Card title={this.title}>
        <ToggleButton value={true} labels={{ checked: 'log', unchecked: '' }}/>
        <div class="field">
          <input id="switchExample" type="checkbox" name="switchExample" class="switch" checked="checked"/>
          <label for="switchExample">Switch example</label>
        </div>
        <Plot style={{ height: '200px' }} data={this.plotData} layout={this.plotLayout} />
      </Card>
    );
  },
};
