import style from './style.css?module';
import TreeView from 'vue-json-tree-view/src/TreeView';
import moment from "moment";
import * as ms from '@/services/models';

export default {
  name: 'Metric',
  props: {
    trace: {
      required: true,
      type: Object,
    },
  },
  render() {
    return (
      <div class="card">
        <div class={style.layout}>
          <div class={[style.content]}>
            { this.trace.name }
          </div>
        </div>
      </div>
    );
  },
};
