import TraceCard from '@/components/TraceCard'
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'TracePage',
  computed: {
    ...mapGetters('trace', [
      'charts',
    ]),
  },
  render: function render(h) {
    return (
      <div>
        {
          this.charts.map(chart => 
            <TraceCard 
              title={chart.title}
              plotData={chart.plotData}
            >
            </TraceCard>)
        }
      </div>
    )
  }
};
