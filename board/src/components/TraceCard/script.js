import Card from '@/components/Card'
import Plot from '@/components/Plot'
import CheckBox from 'buefy/src/components/checkbox/Checkbox'

export default {
  name: 'TraceCard',
  props:{
    title: String,
    plotData: Array,
  },
  data(){
    return {
      isLog: false,
    }
  },
  methods:{
    handleCheck(checkedValue){
      this.isLog = checkedValue
    }
  },
  computed:{
    yaxisType(){
      if(this.isLog){
        return "log";
      }else{
        return "liner";
      }
    },
    plotLayout(){
      return {
        showlegend: true,
        margin:{
          r: 0,
          t: 40,
          b: 20,
          l: 20
        },
        autosize: true,
        yaxis: {
          type: this.yaxisType, 
        }
      }
    }
  },
  render: function render(h) {
    return (
      <Card title={this.title}>
        <CheckBox vOn:input={this.handleCheck}>
          log
        </CheckBox>
        <Plot style={{height: '200px' }} data={this.plotData} layout={this.plotLayout} />
      </Card>
    )
  }
};
