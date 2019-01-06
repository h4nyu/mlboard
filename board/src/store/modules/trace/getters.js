import _ from 'lodash'
export default {
  tags(state){
    return _.uniqBy(_.map(state.all, x => x.tag));
  },
  plotlyTraces(state){
    let traces = _.groupBy(state.all, x => x.tag);
    traces = _.mapValues(traces, (v, k) => { 
      return {
        x: _.map(v, row => row.x),
        y: _.map(v, row => row.y),
        mode: 'markers',
        type: 'scatter',
        name: k,
      };
    });
    return _.toArray(traces)
  },
}
