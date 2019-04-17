import { mapState, mapActions } from 'vuex';
import ExperimentList from '@/components/ExperimentList';
import * as experimentStore from '@/store/experimentStore';

export default {
  name: 'TheExperimentList',
  methods: {
    ...mapActions({
      deleteClick: experimentStore.actionTypes.DELETE,
      chartClick: experimentStore.actionTypes.SELECT_ID,
    }),
  },
  computed: {
    ...mapState({
      experimentSet: state => state[experimentStore.namespace].experimentSet,
      selectedIds: state => state[experimentStore.namespace].selectedIds,
    }),
  },
  render() {
    return (
      <ExperimentList
        experimentSet={this.experimentSet}
        selectedIds={this.selectedIds}
        vOn:deleteClick={this.deleteClick}
        vOn:chartClick={this.chartClick}
      />
    );
  },
};
