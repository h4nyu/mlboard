import PlotlyPlot from '@/components/PlotlyPlot'
import PlotFrame from '@/components/PlotFrame'
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'TracePage',
  data(){
    return {
      charts:['aaaa', 'bbbb']
    }
  },
  computed: {
    ...mapGetters('trace', [
      'plotlyTraces',
    ])
  },
  render: function render(h) {
    return (
      <div>
        <PlotFrame>
          <PlotlyPlot data={this.plotlyTraces}/>
        </PlotFrame>
      </div>
    )
  }
};
