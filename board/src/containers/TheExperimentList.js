import { mapState, mapActions } from 'vuex';
import ExperimentList from '@/components/ExperimentList'

export default { name: 'ExperimentList',
  methods: {
    ...mapActions('experiment', [
      'DELETE',
      "SELECT_ID",
      "UNSELECT_ID",
    ]),
    ...mapActions('app', [
      'FETCH',
    ]),
  },
  computed: {
    ...mapState('experiment', [
      'all',
      'selectedIds',
    ])
  },
  render(h){
    return (
      <ExperimentList>
      </ExperimentList>
    )
  }
};

