import TreeView from "vue-json-tree-view/src/TreeView"
import { mapState, mapActions } from 'vuex';
import BTable from 'buefy/src/components/table/Table' 
import BTableColumn from 'buefy/src/components/table/TableColumn'
import Empty from '@/components/Empty'
import ExperimentListItem from '@/components/ExperimentListItem'
import Timeago from 'vue-timeago'
import filters from '@/filters'

export default { name: 'ExperimentList',
  components:{
    TreeView,
    BTable,
    BTableColumn,
    Timeago,
    Empty,
  },
  props: {
    data: Array,
  },
  methods: {
    ...mapActions('experiment', [
      'DELETE',
      "SELECT_ID",
      "UNSELECT_ID",
    ]),
    ...mapActions('app', [
      'FETCH',
    ]),
  },
  computed: {
    ...mapState('experiment', [
      'all',
      'selectedIds',
    ])
  },
  render: function render(h) {
    return (
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Experiments
          </p>
          <span class="card-header-icon">
            <div class="button is-white" vOn:click={this.FETCH}>
              <i class="fas fa-sync-alt"></i>
            </div>
          </span>
        </header>
        <div class="card-table">
          <div class="content">
            <table class="table is-fullwidth is-striped">
              <tbody>
                {this.all.map(e=>
                  <ExperimentListItem 
                    data={e} 
                    vOn:check={this.SELECT_ID}
                    vOn:uncheck={this.UNSELECT_ID}
                    vOn:delete={this.DELETE}
                  />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
};

