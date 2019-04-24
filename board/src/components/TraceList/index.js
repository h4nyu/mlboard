import style from './style.css?module';
import TreeView from 'vue-json-tree-view/src/TreeView';
import SelectCard from '@/components/SelectCard';
import Trace from '@/components/Trace';
import SearchInput from "@/components/SearchInput";
import fp from 'lodash/fp';
import _ from 'lodash/fp';

export default {
  name: 'TraceList',
  props: {
    traceSet: {
      type: Object,
      default: () => {},
    },
    currentSet: {
      type: Object,
      default: () => {},
    },
    selectedIds: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleSelect({traceId}) {
      const isSelected = !this.getIsSelected({traceId});
      this.$emit('select', {traceId, isSelected});
    },
    getIsSelected({ traceId }) {
      return fp.includes(traceId)(this.selectedIds);
    },
  },
  computed: {
    orderedItems() {
      return fp.pipe(
        fp.toArray,
        fp.sortBy(x => x.name),
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
              <SelectCard 
                isSelected={this.getIsSelected({ traceId: x.id })}
                vOn:click_native={() => this.handleSelect({traceId: x.id})}
              >
                <Trace
                  trace={x}
                />
              </SelectCard>
            ))
          }
        </div>
      </div>
    );
  },
};
