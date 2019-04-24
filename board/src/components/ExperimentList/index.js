import style from './style.css?module';
import TreeView from 'vue-json-tree-view/src/TreeView';
import SelectCard from '@/components/SelectCard';
import ExperimentListItem from '@/components/ExperimentListItem';
import SearchInput from "@/components/SearchInput";
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
    handleSelect({experimentId}) {
      this.$emit('select', {experimentId});
    },
    getIsSelected({ experimentId }) {
      return fp.includes(experimentId)(this.selectedIds);
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
        <div class={style.header}>
          <p class="card-header-title">
            Experiments
          </p>
        </div>
        <SearchInput />
        <div class={style.content}>
          {
            this.orderedExperiments.map(x => (
              <SelectCard isSelected={this.getIsSelected({ experimentId: x.id })}>
                <ExperimentListItem
                  vOn:dateClick={this.handleSelect}
                  experiment={x}
                />
              </SelectCard>
            ))
          }
        </div>
      </div>
    );
  },
};
