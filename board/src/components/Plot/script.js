import Plotly from 'plotly.js-dist';
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
  'legendclick',
];

export default {
  name: 'Plot',
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
      default() {
        return {
          responsive: true,
        };
      },
    },
  },
  methods: {
    newPlot() {
      Plotly.newPlot(this.$el, this.data, this.layout, this.option)
        .then(this.attach)
        .then(this.registerEvents);
    },
    attach() {
      const g = this.$el;
      g.addEventListener('mousemove', (evt) => {
        this.$emit('mousemove', this.getPosition(evt));
      });
    },
    getPosition(evt) {
      const g = this.$el;
      const { xaxis } = g._fullLayout;
      const { yaxis } = g._fullLayout;
      if (yaxis & xaxis) {
        const { l } = g._fullLayout.margin;
        const { t } = g._fullLayout.margin;
        const x = xaxis.p2c(evt.x - l);
        const y = yaxis.p2c(evt.y - t);
        return { x, y };
      }

      return { x: null, y: null };
    },
    registerEvents() {
      const mapEvents = fp.map(eventName => ({
        fullName: `plotly_${eventName}`,
        handler: (x) => {
          this.$emit(eventName, x);
        },
      }));
      const register = fp.forEach((x) => {
        this.$el.on(x.fullName, x.handler);
      });
      this.__generalListeners = fp.pipe([
        mapEvents,
        register,
      ])(events);
    },
    react() {
      return Plotly.react(
        ...this.plotConfig,
      );
    },
    gantt(seg) {
      return fp.map(range => ({
        ...seg,
        y: [seg.group, seg.group],
        x: [range.from, range.to],
        legendgroup: seg.name,
        mode: 'lines',
        visible: true,
      }))(seg.ranges);
    },
  },
  computed: {
    plotConfig() {
      return [
        this.$el,
        this.data,
        this.layout,
        this.option,
      ];
    },
  },
  beforeDestroy() {
    fp.forEach((obj) => {
      this.$el.removeAllListeners(obj.fullName);
    })(this.__generalListeners);
    Plotly.purge(this.$el);
  },
  watch: {
    plotConfig(oldValue, newValue) {
      this.react()
        .catch((e) => {
          this.newPlot();
        });
    },
  },
  mounted() {
    this.newPlot();
    this.$parent.$emit('ploted');
  },
  render: function render(h) {
    return (
      <div></div>
    );
  },
};
