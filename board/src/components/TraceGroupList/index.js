import style from './style.css?module';
import TreeView from 'vue-json-tree-view/src/TreeView';
import SelectCard from '@/components/SelectCard';
import TraceGroupItem from '@/components/TraceGroupItem';
import SearchInput from "@/components/SearchInput";
import fp from 'lodash/fp';
import _ from 'lodash/fp';

export default {
  name: 'TraceGroupList',
  props: {
    traceSet: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handleSelect({traceIds}) {
      this.$emit('select', {traceIds: traceIds});
    },
  },
  computed: {
    orderedItems() {
      return fp.pipe(
        fp.toArray,
        fp.groupBy(x => x.name),
        fp.map.convert({cap:false})((v, k) => {
          return {
            name: k,
            traceIds: fp.map(x => x.id)(v)
          }
        })
      )(this.traceSet);
    },
  },
  render() {
    return (
      <div class="card">
        <div class={style.header}>
          <p class="card-header-title">
            Traces
          </p>
        </div>
        <SearchInput />
        <div class={style.content}>
          {
            this.orderedItems.map(x => (
                <TraceGroupItem
                  name={x.name}
                  traceIds={x.traceIds}
                  vOn:select={this.handleSelect}
                />
            ))
          }
        </div>
      </div>
    );
  },
};
