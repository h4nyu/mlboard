import TreeView from "vue-json-tree-view/src/TreeView"
import { mapState, mapActions } from 'vuex';
import Empty from '@/components/Empty'
import Timeago from 'vue-timeago'
import filters from '@/filters'
import FilterList from '@/components/FilterList'
import ExperimentListItem from '@/components/ExperimentListItem'

export default { name: 'ExperimentList',
  render(h){
    return (
      <FilterList 
        data={this.all}
        getKey={e => e.tag}
        scopedSlots={{
          row: data => <ExperimentListItem data={data} vOn:check={this.SELECT_ID} vOn:uncheck={this.UNSELECT_ID} vOn:delete={this.DELETE} /> 
        }}
      >
        <template slot='header'>
          <p class="card-header-title">
            Experiments
          </p>
          <span class="card-header-icon">
            <div class="button is-white" vOn:click={this.FETCH}>
              <i class="fas fa-sync-alt"></i>
            </div>
          </span>
        </template>
      </FilterList>
    )
  }
};
