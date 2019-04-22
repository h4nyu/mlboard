import { mapState, mapActions } from 'vuex';
import MetricList from '@/components/MetricList';
import * as metricStore from "@/store/metricStore";

export default {
  name: 'TheMetricList',
  computed: {
    ...mapState({
      metricSet: state => state[metricStore.namespace].metricSet,
      selectedIds: state => state[metricStore.namespace].selectedIds,
    }),
  },
  render() {
    return (
      <MetricList
        metricSet={this.metricSet}
        selectedIds={this.selectedIds}
      />
    );
  },
};

