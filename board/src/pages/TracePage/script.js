import PlotlyPlot from '@/components/PlotlyPlot'
import PlotFrame from '@/components/PlotFrame'

export default {
  name: 'TracePage',
  data(){
    return {
      charts:['aaaa', 'bbbb']
    }
  },
  render: function render(h) {
    return (
      <div>
        {this.charts.map(chart => 
          <PlotFrame>
            <PlotlyPlot />
          </PlotFrame>
        )}
      </div>
    )
  }
};
