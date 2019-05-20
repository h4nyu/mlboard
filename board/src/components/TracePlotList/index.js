import style from './style.css?module';
import TreeView from 'vue-json-tree-view/src/TreeView';
import SelectCard from '@/components/SelectCard';
import TracePlot from '@/components/TracePlot';
import SearchInput from "@/components/SearchInput";
import fp from 'lodash/fp';
import _ from 'lodash/fp';

export default {
  name: 'TracePlotList',
  props: {
    traceGroups: {
      type: Array,
      required: true,
    },
    tracePointSet: {
      type: Object,
      required: true,
    },
    experimentSet: {
      type: Object,
      required: true,
    },
    traceSet: {
      type: Object,
      required: true,
    },
  },
  methods:{
    getItemElm(traceGroup){
      return (
        <TracePlot
          tracePointSet={this.tracePointSet}
          traceGroup={traceGroup}
          traceSet={this.traceSet}
          experimentSet={this.experimentSet}
        />
      )
    }
  },
  computed: {
    items() {
      return fp.toArray(this.traceGroupSet)
    }
  },
  render() {
    return (
      <div class="card">
        <div class={style.content}>
          {
            this.traceGroups.map(this.getItemElm)
          }
        </div>
      </div>
    );
  },
};
