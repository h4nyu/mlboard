import style from './style.css?module';
import TreeView from 'vue-json-tree-view/src/TreeView';
import moment from "moment";
import * as ms from '@/services/models';

export default {
  name: 'TraceGroupItem',
  props: {
    name: {
      required: true,
      type: String,
    },
    traceIds: {
      required: true,
      type: Array,
    },
  },
  methods: {
    handleClick(){
      this.$emit('select', {traceIds:this.traceIds});
    }
  },
  render() {
    return (
      <div class="card">
        <div class={style.layout}>
          <div class={[style.content]} vOn:click={this.handleClick}>
            { this.name }
          </div>
        </div>
      </div>
    );
  },
};
