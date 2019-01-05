import styles from '@/App/style.scss'
import TreeView from "vue-json-tree-view/src/TreeView"
import { mapState, mapActions } from 'vuex';
import BTable from 'buefy/src/components/table/Table' 
import BTableColumn from 'buefy/src/components/table/TableColumn'
import Empty from '@/components/Empty'
import Timeago from 'vue-timeago'
import filters from '@/filters'
console.log(Empty);




export default {
  name: 'ExperimentList',
  components:{
    TreeView,
    BTable,
    BTableColumn,
    Timeago,
    Empty,
  },
  data(){
    return {
      columns:[
        {
          field: 'tag',
          label: 'TAG',
          width: '40',
        },
      ],
      checked: []
    }
  },
  methods: {
    ...mapActions('experiment', [
      'DELETE'
    ]),

  },
  computed: {
    ...mapState('experiment', [
      'all',
    ])
  },
  render: function render(h) {
    return (
      <b-table 
        data={this.all} 
        checkable
        jk
        scopedSlots={{
          default: props => (
            [
              <b-table-column field="tag" label="experiment" width="40">
                <tree-view 
                  data={props.row.config}
                  options={
                    {
                      maxDepth: 0,
                      rootObjectKey: props.row.tag,
                    }
                  }
                />
              </b-table-column>,
              <b-table-column field="delete" label="">
                <a class="button" vOn:Click={() => this.DELETE(props.row.id)}> 
                  <i class="fas fa-trash"></i>
                </a>
              </b-table-column>,
            ]
          ),
          empty: () => (<empty/>)
        }}
      >
      </b-table>
    )
  }
};
