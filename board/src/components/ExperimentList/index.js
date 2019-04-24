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
  data(){
    return {
      keyword: "",
    }
  },
  methods: {
    handleRefreshClick() {
      this.$emit('refresh');
    },
    handleDeleteClick({experimentId}) {
      this.$emit('deleteClick', {experimentId});
    },
    handleSelect({experimentId}) {
      const isSelected = !this.getIsSelected({experimentId});
      this.$emit('select', {experimentId, isSelected});
    }, getIsSelected({ experimentId }) {
      return fp.includes(experimentId)(this.selectedIds);
    },
    handeSeach(keyword){
      this.keyword = keyword;
    },
  },
  computed: {
    orderedExperiments() {
      const regex = new RegExp(this.keyword);
      return fp.pipe(
        fp.toArray,
        fp.filter(x => !fp.isNil(x.name.match(regex))),
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
        <SearchInput vOn:input={this.handeSeach} />
        <div class={style.content}>
          {
            this.orderedExperiments.map(x => (
              <SelectCard isSelected={this.getIsSelected({ experimentId: x.id })}>
                <ExperimentListItem
                  vOn:dateClick={this.handleSelect}
                  vOn:deleteClick={this.handleDeleteClick}
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
