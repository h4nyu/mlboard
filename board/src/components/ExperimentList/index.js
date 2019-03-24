import TreeView from 'vue-json-tree-view/src/TreeView';
import FilterList from '@/components/FilterList';
import SelectItem from '@/components/SelectItem';
import ExperimentListItem from '@/components/ExperimentListItem';
import fp from 'lodash/fp';

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
    getIsSelected(id) {
      return _.includes(this.selectedIds, id);
    },
  },
  computed: {
    orderedExperiments() {
      return fp.pipe(
        fp.toArrray,
        fp.orderBy(x => x.createDate),
      )(this.experimentSet);
    },
  },
  render() {
    return (
      <FilterList
        data={this.orderedExperiments}
        getKey={e => e.tag}
        scopedSlots={{
          row: experiment => (
            <SelectItem
              isSelected={this.getIsSelected(experiment.id)}
            >
              <ExperimentListItem
                experiment={experiment}
                vOn:deleteClick={this.handleDeleteClick}
                vOn:chartClick={this.handleChartClick}
              />
            </SelectItem>
          ),
        }}
      >
        <template slot='header'>
          <p class="card-header-title">
            Experiments
          </p>
          <span class="card-header-icon">
            <div class="button is-white" vOn:click={this.handleRefreshClick}>
              <i class="fas fa-sync-alt"></i>
            </div>
          </span>
        </template>
      </FilterList>
    );
  },
};
