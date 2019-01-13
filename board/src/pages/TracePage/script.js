import TraceCard from '@/components/TraceCard'
import SearchInput from '@/components/SearchInput'
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'TracePage',
  data(){
    return {
      filterRegExp: new RegExp(''),
      isValidRegExp: true,
    }
  },
  computed: {
    ...mapGetters('trace', [
      'charts',
    ]),
  },
  methods:{
    handleFilterInput(txt){
      try {
        const reg = new RegExp(txt);
        this.filterRegExp = reg;
        this.isValidRegExp = true;
      } catch(e) {
        this.isValidRegExp = false;
        this.filterRegExp = new RegExp('');
      }
    }
  },
  render: function render(h) {
    return (
      <div>
        <SearchInput placeholder="Filter Metrics" vOn:input={this.handleFilterInput}/>
        {
          this.charts
            .filter(chart => this.filterRegExp.test(chart.title))
            .map(chart => 
              <TraceCard 
                title={chart.title}
                plotData={chart.plotData}
              >
              </TraceCard>)
        }
      </div>
    )
  }
};
