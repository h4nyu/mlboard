import style from './style.css?module';
import TreeView from 'vue-json-tree-view/src/TreeView';
import moment from "moment";
import _ from 'lodash';
import * as ms from '@/services/models';

export default {
  name: 'ExperimentListItem',
  props: {
    experiment: {
      required: true,
      type: Object,
    },
  },
  methods: {
    handleSelect() {
      this.$emit('select', {experimentId: this.experiment.id})
    },
  },
  computed:{
    relativeDate(){
      return moment(this.experiment.createDate).fromNow(); 
    },
    score(){
      if(_.isNumber(this.experiment.score)){
        return this.experiment.score;
      }else{
        return "";
      }
    }
  },
  render() {
    return (
      <div class="card">
        <div class={style.layout}>
          <div class={style.content}>
            <TreeView
              data={this.experiment.config}
              options={{ maxDepth: 0, rootObjectKey: this.experiment.name }}
            >
            </TreeView>
          </div>
          <div class={style.action}>
            <a class="button is-small" vOn:click={() => this.$emit('deleteClick', { experimentId: this.experiment.id })}>
              <i class="fas fa-trash"></i>
            </a>
          </div>
          <span class={[style.score]} vOn:click={this.handleSelect}>
            {this.score}
          </span>
          <span class={[style.date]} vOn:click={this.handleSelect}>
            {this.relativeDate}
          </span>
        </div>
      </div>
    );
  },
};
