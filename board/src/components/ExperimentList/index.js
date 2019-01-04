import styles from '@/App/style.scss'
import TreeView from "vue-json-tree-view/src/TreeView"
import { mapState, mapActions } from 'vuex';
import BTable from 'buefy/src/components/table/Table' import BTableColumn from 'buefy/src/components/table/TableColumn'



export default {
  name: 'ExperimentList',
  components:{
    TreeView,
    BTable,
    BTableColumn,
  },
  data(){
    return {
      columns:[
        {
          field: 'tag',
          label: 'TAG',
          width: '40',
        },
      ]
    }
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
        scopedSlots={{
          default: props => (
            [
              <b-table-column field="tag" label="tag" width="40">
                <tree-view 
                  data={props.row.config}
                  options={
                    {
                      maxDepth: 4,
                      rootObjectKey: props.row.tag,
                    }
                  }
                />
              </b-table-column>,
              <b-table-column field="create_date" label="create date" width="40">
                {props.row.create_date}
              </b-table-column>
            ]
          ),
          detail: props => {
            <b-table-column field="tag" label="tag" width="40">
              detail! { props.row.tag }
            </b-table-column>
          }
        }}
      >
      </b-table>
    )
  }
};
