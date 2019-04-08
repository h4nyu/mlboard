import TreeView from 'vue-json-tree-view/src/TreeView';
import SelectCard from '@/components/SelectCard';
import ExperimentListItem from '@/components/ExperimentListItem';
import fp from 'lodash/fp';
import _ from 'lodash/fp';

export default {
  name: 'ExperimentList',
  props: {
    experimentSet: {
      type: Object,
      default: () => {},
    },
    selectedIds: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    console.log(this);
  },
  methods: {
    handleRefreshClick() {
      this.$emit('refresh');
    },
    handleDeleteClick(e) {
      this.$emit('deleteClick', e);
    },
    handleChartClick(e) {
      this.$emit('chartClick', e);
    },
    getIsSelected({ experimentId }) {
      return _.includes(this.selectedIds, experimentId);
    },
  },
  computed: {
    orderedExperiments() {
      return fp.pipe(
        fp.toArray,
        fp.sortBy(x => x.createDate),
      )(this.experimentSet);
    },
  },
  render() {
    return (
      <div class="card">
        {
          this.orderedExperiments.map(x => (
            <SelectCard isSelected={this.getIsSelected({ experimentId: x.id })}>
              <ExperimentListItem
                experiment={x}
              />
            </SelectCard>
          ))
        }
      </div>
    );
  },
};
