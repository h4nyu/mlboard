import _ from 'lodash'
export default {
  tags(state, getters, rootState, rootGetters){
    return _.uniqBy(_.map(state.all, x => x.tag));
  },
  plotDatas(state, getters, rootState, rootGetters){
    let traces = _.groupBy(state.all, x => x.tag);
    traces = _.mapValues(traces, (v, k) => { 
      console.log(_.find(rootState.experiment.all, e => e.id === v[0].experiment_id).tag);
      return {
        x: _.map(v, row => row.x),
        y: _.map(v, row => row.y),
        mode: 'markers',
        type: 'scatter',
        name: _.find(rootState.experiment.all, e => e.id === v[0].experiment_id).tag,
        tag: k,
      };
    });
    return _.toArray(traces)
  },
  charts(state, getters, rootState, rootGetters){
    let charts = _.groupBy(getters.plotDatas, x => x.tag);
    charts = _.mapValues(charts, (v, k) => { 
      return {
        title: k,
        plotData: v,
      }
    });
    return _.toArray(charts)
  },
}
