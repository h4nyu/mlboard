import { mapState, mapActions } from 'vuex';
import TraceList from '@/components/TraceList';
import * as traceStore from "@/store/traceStore";

export default {
  name: 'TheTraceList',
  computed: {
    ...mapState({
      traceSet: state => state[traceStore.namespace].traceSet,
      selectedIds: state => state[traceStore.namespace].selectedIds,
    }),
  },
  methods:{
    ...mapActions({
      select: traceStore.actionTypes.SELECT,
    })
  },
  render() {
    return (
      <TraceList
        traceSet={this.traceSet}
        selectedIds={this.selectedIds}
        vOn:select={this.select}
      />
    );
  },
};

