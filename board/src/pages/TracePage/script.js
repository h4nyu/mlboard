import TraceCard from '@/components/TraceCard'
import FilterList from '@/components/FilterList'
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
      <FilterList
        data={this.charts}
        getKey={i => i.title}
        scopedSlots={{
          row: chart => <TraceCard title={chart.title} plotData={chart.plotData} />
        }}
      >
      </FilterList>
    )
  }
};
