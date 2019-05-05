import { mapState, mapActions } from 'vuex';
import TraceGroupList from '@/components/TraceGroupList';
import * as traceStore from "@/store/traceStore";

export default {
  name: 'TheTraceGroupList',
  computed: {
    ...mapState({
      traceSet: state => state[traceStore.namespace].traceSet,
    }),
  },
  methods:{
    ...mapActions({
      select: traceStore.actionTypes.SELECT,
    })
  },
  render() {
    return (
      <TraceGroupList
        traceSet={this.traceSet}
        vOn:select={this.select}
      />
    );
  },
};

