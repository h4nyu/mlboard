import * as echarts from 'echarts';
import fp from 'lodash/fp';


export default {
  name: 'EChart',
  data() {
    return {
      syncSizeId: null,
      width: null,
      height: null,
      chart: null,
    };
  },
  props: {
    option: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    syncSize() {
      if (this.$el) {
        this.width = this.$el.clientWidth;
        this.height = this.$el.clientHeight;
      }
    },
    resize(){
      if(!fp.isNil(this.chart)){
        this.chart.resize()
      }
    }
  },
  watch:{
    option(newValue, oldValue){
      this.chart.setOption(newValue);
    },
    width(newValue, oldValue){
      if(newValue !== oldValue){
        this.resize()
      }
    },
    height(newValue, oldValue){
      if(newValue !== oldValue){
        this.resize()
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.syncSizeId);
    echarts.dispose(this.$el);
  },
  mounted() {
    this.syncSizeId = setInterval(this.syncSize, 500);
    this.chart = echarts.init(this.$el);
    this.chart.setOption(this.option);
  },
  render() {
    return (
      <div></div>
    );
  },
};

