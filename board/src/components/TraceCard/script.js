import Card from '@/components/Card'
import Plot from '@/components/Plot'

export default {
  name: 'TraceCard',
  props:{
    title: String,
    plotData: Array,
  },
  data(){
    return {
      plotLayout:{
        showlegend: true,
        margin:{
          r: 0,
          t: 40,
          b: 20,
          l: 20
        },
        autosize: true,
      },
    }
  },
  render: function render(h) {
    return (
      <Card title={this.title}>
        <Plot style={{height: '200px' }} data={this.plotData} layout={this.plotLayout} />
      </Card>
    )
  }
};
