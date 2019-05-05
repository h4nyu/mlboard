import style from './style.css?module';
import TreeView from 'vue-json-tree-view/src/TreeView';
import SelectCard from '@/components/SelectCard';
import ExperimentListItem from '@/components/ExperimentListItem';
import SearchInput from "@/components/SearchInput";
import fp from 'lodash/fp';
import _ from 'lodash';

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
      sortKey: "createDate",
      sortOptions: [
        {
          key: "score",
          label: 'score',
        },
        {
          key: "createDate",
          label: 'create date',
        },
      ],
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
    },
    handleScoreSortClick({key}) {
      this.sortKey = key;
    },
    getIsSelected({ experimentId }) {
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
        fp.sortBy(x => -x[this.sortKey]),
      )(this.experimentSet);
    },
  },
  render() {
    const sortOptionsElm = this.sortOptions.map(x => {
      const isSelectedStyles = x.key == this.sortKey ? ["is-info", "is-selected"] : [];
      return (
        <span 
          class={["button", ...isSelectedStyles]}
          vOn:click={() => this.handleScoreSortClick({key: x.key})}
        >
          {x.label}
        </span>
      )
    })
    return (
      <div class={["card", style.layout]}>
        <div class={style.header}>
          <p class="card-header-title">
            Experiments
          </p>
        </div>
        <SearchInput vOn:input={this.handeSeach} class={style.search} />
        <div class={style.sort}>
          <div class="buttons has-addons">
            {sortOptionsElm}
          </div>
        </div>
        <div class={style.content}>
          {
            this.orderedExperiments.map(x => (
              <SelectCard isSelected={this.getIsSelected({ experimentId: x.id })}>
                <ExperimentListItem
                  vOn:select={this.handleSelect}
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
