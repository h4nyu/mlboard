import SearchInput from '@/components/SearchInput';

export default {
  name: 'FilterList',
  data() {
    return {
      filterRegExp: new RegExp(''),
      isValidRegExp: true,
    };
  },
  components: {
    SearchInput,
  },
  props: {
    data: Array,
    placeholder: String,
    getKey: Function,
  },
  methods: {
    handleFilterInput(txt) {
      try {
        const reg = new RegExp(txt);
        this.filterRegExp = reg;
        this.isValidRegExp = true;
      } catch (e) {
        this.isValidRegExp = false;
        this.filterRegExp = new RegExp('');
      }
    },
  },
  render() {
    return (
      <div class="card">
        <header class="card-header">
          {this.$slots.header}
        </header>
        <search-input
          placeholder={this.placeholder}
          vOn:input={this.handleFilterInput}>
        </search-input>
        <div class="card-table">
          <div class="content">
            <table class="table is-fullwidth is-striped">
              <tbody>
                {
                  this.data
                    .filter(item => this.filterRegExp.test(this.getKey(item)))
                    .map(this.$scopedSlots.row)
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  },
};
