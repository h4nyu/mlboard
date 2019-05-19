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
      console.log('aaa');
      this.chart.setOption(newValue);
    },
    width(){
      this.resize()
    },
    height(){
      this.resize()
    }
  },
  beforeDestroy() {
    clearInterval(this.syncSizeId);
  },
  mounted() {
    this.syncSizeId = setInterval(this.syncSize, 0.5);
    this.chart = echarts.init(this.$el);
    this.chart.setOption(this.option);
  },
  render() {
    return (
      <div style="width: 100%;height:400px;"></div>
    );
  },
};

