import Plot from '@/components/Plot';
import style from './style.css?module';


export default {
  name: 'TracePlot',
  props: {
    tracePointSet: { type: Object, default: () => ([]) },
    traceGroupe: { type: Object, required: true },
    traceSet: { type: Object, required: true },
    experimentSet: { type: Object, required: true },
    xAixs: { type: String, default: () => 'DATE' },
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
      return this.traceGroupe.traceIds.map(traceId => {
        const trace = this.traceSet[traceId];
        console.log(trace);
        const experiment = this.experimentSet[trace.experimentId];
        let x = [];
        if (this.xAixsType === 'DATE') {
          x = this.tracePointSet[traceId].map(t => t.ts);
        } else {
          x = this.tracePointSet[traceId].map(t => t.x);
        }

        return {
          y: this.tracePointSet[traceId].map(t => t.y),
          mode: 'markers+lines',
          type: 'scattergl',
          name: experiment.name,
        }
      })
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
          t: 5,
          b: 20,
          l: 20,
        },
        autosize: true,
        yaxis: {
          type: this.yaxisType,
        },
        legend: {
          orientation: "h",
        },
      };
    },
  },
  render: function render(h) {
    return (
      <div class={["card", style.layout]}>
        <div class={[style.title]}>
          <div class={['is-size-5']}>
            {this.traceGroupe.name}
          </div>
        </div>
        <Plot class={[style.plot]} data={this.plotData} layout={this.plotLayout} />
      </div>
    );
  },
};
