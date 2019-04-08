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
      experimentSet: state => state.experiment.experimentSet,
      selectedIds: state => state.experiment.selectedIds,
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
