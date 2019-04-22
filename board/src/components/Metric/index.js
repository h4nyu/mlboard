import style from './style.css?module';
import TreeView from 'vue-json-tree-view/src/TreeView';
import moment from "moment";
import * as ms from '@/services/models';

export default {
  name: 'Metric',
  props: {
    metric: {
      required: true,
      type: Object,
    },
  },
  render() {
    return (
      <div class="card">
        <div class={style.layout}>
          <div class={[style.content]}>
            { this.metric.name }
          </div>
        </div>
      </div>
    );
  },
};
