import { mapState, mapActions } from 'vuex';
import ExperimentList from '@/components/ExperimentList';

export default {
  name: 'TheExperimentList',
  methods: {
    ...mapActions('experiment', ['DELETE', 'SELECT_ID', 'UNSELECT_ID']),
    ...mapActions('app', ['FETCH']),
  },
  computed: {
    ...mapState('experiment', ['all', 'selectedIds']),
  },
  render() {
    return (
      <ExperimentList
        experiments={this.all}
        selectedIds={this.selectedIdList}
        vOn:deleteClick={this.DELETE}
        vOn:chartClick={this.SELECT_ID}
      />
    );
  },
};
