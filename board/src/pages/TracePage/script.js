import TraceList from '@/components/TraceList'
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
        <TraceList />
      </div>
    )
  }
};
