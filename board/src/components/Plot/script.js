import Plotly from 'plotly.js-dist';
import * as d3 from 'd3';
import fp from 'lodash/fp';

const events = [
  'click',
  'hover',
  'unhover',
  'selecting',
  'selected',
  'relayout', 
  'autosize',
  'deselect',
  'doubleclick',
  'redraw',
  'animated',
  'legendclick'
];

export default {
  name:"Plot",
  props: {
    data: {
      type: Array,
      default: () => ([]),
    },
    layout: {
      type: Object,
      default: () => ({}),
    },
    option: {
      type: Object,
      default: function () {
        return {
          responsive: true
        };
      }
    }
  },
  methods: {
    newPlot(){
      Plotly.newPlot(this.$el, this.data, this.layout, this.option)
        .then(this.attach)
        .then(this.registerEvents);
    },
    attach: function(){
      const g = this.$el;
      g.addEventListener('mousemove', evt => {
        this.$emit('mousemove', this.getPosition(evt));
      });
    },
    getPosition: function(evt){
      const g = this.$el;
      const xaxis = g._fullLayout.xaxis;
      const yaxis = g._fullLayout.yaxis;
      if (yaxis & xaxis){
        const l = g._fullLayout.margin.l;
        const t = g._fullLayout.margin.t;
        const x = xaxis.p2c(evt.x - l);
        const y = yaxis.p2c(evt.y - t);
        return {x, y}
      }
      else{
        return { x: null, y: null }
      }
    },
    registerEvents: function () {
      const mapEvents = fp.map((eventName) => {
        return {
          fullName: `plotly_${eventName}`,
          handler: x => {
            this.$emit(eventName, x);
          }
        };
      });
      const register = fp.forEach(x => {
        this.$el.on(x.fullName, x.handler);
      });
      this.__generalListeners = fp.pipe([
        mapEvents,
        register
      ])(events);
    },
    react: function () {
      return Plotly.react(
        ...this.plotConfig
      );
    },
    gantt:function(seg){
      return fp.map(range => {
        return {
          ...seg,
          y: [seg.group, seg.group],
          x: [range.from, range.to],
          legendgroup: seg.name,
          mode: 'lines',
          visible: true,
        };
      })(seg.ranges)
    },
  },
  computed:{
    plotConfig:function(){
      console.info(this.$el);
      return [
        this.$el,
        this.data,
        this.layout,
        this.option
      ]
    }
  },
  beforeDestroy: function () {
    fp.forEach(obj => {
      this.$el.removeAllListeners(obj.fullName);
    })(this.__generalListeners);
    Plotly.purge(this.$el);
  },
  watch: {
    plotConfig: function (oldValue, newValue) {
      this.react()
        .catch(e => {
          this.newPlot();
        })
    },
  },
  mounted: function () {
    this.newPlot()
    this.$parent.$emit('ploted')
  },
  render: function render(h) {
    return (
      <div></div>
    )
  },
};
