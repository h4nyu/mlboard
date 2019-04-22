import style from './style.css?module';
import TreeView from 'vue-json-tree-view/src/TreeView';
import SelectCard from '@/components/SelectCard';
import Metric from '@/components/Metric';
import SearchInput from "@/components/SearchInput";
import fp from 'lodash/fp';
import _ from 'lodash/fp';

export default {
  name: 'MetricList',
  props: {
    metricSet: {
      type: Object,
      default: () => {},
    },
    currentSet: {
      type: Object,
      default: () => {},
    },
    selectedIds: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleDeleteClick(e) {
      this.$emit('deleteClick', e);
    },
    handleChartClick(e) {
      this.$emit('chartClick', e);
    },
    getIsSelected({ metricId }) {
      return _.includes(this.selectedIds, metricId);
    },
  },
  computed: {
    orderedItems() {
      return fp.pipe(
        fp.toArray,
        fp.sortBy(x => x.name),
      )(this.metricSet);
    },
  },
  render() {
    return (
      <div class="card">
        <div class={style.header}>
          <p class="card-header-title">
            Metrics
          </p>
        </div>
        <SearchInput />
        <div class={style.content}>
          {
            this.orderedItems.map(x => (
              <SelectCard isSelected={this.getIsSelected({ metricId: x.id })}>
                <Metric
                  metric={x}
                />
              </SelectCard>
            ))
          }
        </div>
      </div>
    );
  },
};
