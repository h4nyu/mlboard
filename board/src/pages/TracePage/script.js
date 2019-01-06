import PlotlyPlot from '@/components/PlotlyPlot'
import PlotFrame from '@/components/PlotFrame'
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'TracePage',
  computed: {
    ...mapGetters('trace', [
      'charts',
    ]),
    plotLayout(){
      return {
        showlegend: true,
        autosize: true,
        margin:{
          r: 0,
          t: 40,
          b: 20,
          l: 20
        },
        height: 200,
      }
    },
  },
  render: function render(h) {
    return (
      <div>
        {
          this.charts.map(chart => 
            <PlotFrame title={chart.title}>
              <PlotlyPlot data={chart.plotData} layout={this.plotLayout}/>
            </PlotFrame>)
        }
      </div>
    )
  }
};
