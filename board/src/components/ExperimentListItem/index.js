import style from "./style.css?module"
import TreeView from "vue-json-tree-view/src/TreeView"
import * as ms from "@/services/models"
console.log(style);

export default {
  name: 'ExperimentListItem',
  props: {
    experiment: {
      required: true, 
      type: ms.Experiment,
    },
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
      <div class="card">
        <div class={style.layout}>
          <div class={style.content}>
            <TreeView
              data={this.experiment.config}
              options={{maxDepth: 0, rootObjectKey: this.experiment.tag}}
            >
            </TreeView>
          </div>
          <div class={style.action}>
            <a class="button is-small" vOn:click={() => this.$emit('deleteClick', {experimentId: this.experiment.id})}>
              <i class="fas fa-trash"></i>
            </a>
          </div>
        </div>
      </div>
    )
  }
};
