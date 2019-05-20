import { mapState, mapActions } from 'vuex';
import TracePlotList from '@/components/TracePlotList';
import * as traceStore from "@/store/traceStore";

export default {
  name: 'TheTraceGroupList',
  computed: {
    ...mapState({
      traceSet: state => state.trace.set,
      tracePointSet: state => state.tracePoint.set,
      experimentSet: state => state.experiment.set,
      traceGroupSet: state => state.traceGroup.set,
      selectedIds: state => state.traceGroup.selectedIds,
    }),
    traceGroups(){
      return this.selectedIds.map(x => this.traceGroupSet[x]);
    }
  },
  render() {
    return (
      <TracePlotList
        traceSet={this.traceSet}
        tracePointSet={this.tracePointSet}
        experimentSet={this.experimentSet}
        traceGroups={this.traceGroups}
      />
    );
  },
};

