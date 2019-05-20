import EChart from '@/components/EChart';
import style from './style.css?module';


export default {
  name: 'TracePlot',
  props: {
    tracePointSet: { 
      type: Object, 
      required: true,
      default: () => ([]) 
    },
    traceGroup: { 
      type: Object, 
      required: true 
    },
    traceSet: { 
      type: Object, 
      required: true 
    },
    experimentSet: { 
      type: Object, 
      required: true 
    },
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
          right: 10,
          left: "10%",
          bottom: 30,
          top: 30,
        }
      };
      const series = this.traceGroup.traceIds.map(traceId => {
        const trace = this.traceSet[traceId];
        const experiment = this.experimentSet[trace.experimentId];
        let data = []
        if(this.tracePointSet[traceId]){
          data = this.tracePointSet[traceId].map(t => ([t.x, t.y]));
        }
        return {
          name: experiment.name,
          data: data,
          type: 'line',
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
            {this.traceGroup.name}
          </div>
        </div>
        <EChart class={[style.plot]} option={this.plotOption}/>
      </div>
    );
  },
};
