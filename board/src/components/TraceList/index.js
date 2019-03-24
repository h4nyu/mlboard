import TraceListItem from '@/components/TraceListItem';
import FilterList from '@/components/FilterList';

export default {
  name: 'TraceList',
  props: {
    title: String,
    plotData: Array,
  },
  data() {
    return {
      isLog: false,
    };
  },
  methods: {
    handleCheck(checkedValue) {
      this.isLog = checkedValue;
    },
  },
  computed: {
    yaxisType() {
      if (this.isLog) {
        return 'log';
      }
      return 'liner';
    },
    plotLayout() {
      return {
        showlegend: true,
        margin: {
          r: 0,
          t: 40,
          b: 20,
          l: 20,
        },
        autosize: true,
        yaxis: {
          type: this.yaxisType,
        },
      };
    },
  },
  render: function render(h) {
  },
};
