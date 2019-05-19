import EChart from '@/components/EChart';
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
    plotOption() {
      const baseOption = {
        xAxis: {},
        yAxis: {},
        legend: {
          type: 'plain',
          orient: 'horizontal',
        },
        grid: {
          right: 20,
          bottom: 50,
        }
      };
      const series = this.traceGroupe.traceIds.map(traceId => {
        const trace = this.traceSet[traceId];
        const experiment = this.experimentSet[trace.experimentId];
        let x = [];
        x = this.tracePointSet[traceId].map(t => t.x);

        return {
          name: trace.name,
          data: this.tracePointSet[traceId].map(t => ([t.x, t.y])),
          type: 'scatter',
        }
      })
      return {
        ...baseOption,
        series,
      }
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
        <EChart class={[style.plot]} option={this.plotOption}/>
      </div>
    );
  },
};
