import TreeView from "vue-json-tree-view/src/TreeView"
import { mapState, mapActions } from 'vuex';
import CheckBox from 'buefy/src/components/checkbox/Checkbox'
import Empty from '@/components/Empty'

export default {
  name: 'ExperimentListItem',
  props: {
    data: Object,
  },
  methods:{
    emitCheck(checkedValue){
      if(checkedValue){
        this.$emit('check', this.data.id)
      }else{
        this.$emit('uncheck', this.data.id)
      }
    }
  },
  render: function render(h) {
    return (
      <div>
        <td width="5%">
          <CheckBox vOn:input={this.emitCheck}/>
        </td>
        <td>
          <TreeView
            data={this.data.config}
            options={{maxDepth: 0, rootObjectKey: this.data.tag}}
          >
          </TreeView>
        </td>
        <td>
          <a class="button is-small" vOn:click={() => this.$emit('delete', this.data)}>
            <i class="fas fa-trash"></i>
          </a>
        </td>
      </div>
    )
  }
};
