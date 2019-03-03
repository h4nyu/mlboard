import TreeView from "vue-json-tree-view/src/TreeView"
import { mapState, mapActions } from 'vuex';
import Empty from '@/components/Empty'
import Timeago from 'vue-timeago'
import filters from '@/filters'
import FilterList from '@/components/FilterList'
import ExperimentListItem from '@/components/ExperimentListItem'

export default { 
  name: 'ExperimentList',
  props:{
    experiments: {
      type: Array,
    }
  },
  methods:{
    handleRefreshClick(){
      this.$emit("refresh")
    },
    handleDeleteClick(e){
      this.$emit("deleteClick", e)
    }
  },
  render(h){
    return (
      <FilterList 
        data={this.experiments}
        getKey={e => e.tag}
        scopedSlots={{
          row: experiment => (
            <ExperimentListItem 
              experiment={experiment} 
              vOn:deleteClick={this.handleDeleteClick} 
            />
          )
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
    )
  }
};
