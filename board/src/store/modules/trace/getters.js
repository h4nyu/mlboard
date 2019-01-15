import _ from 'lodash';
import fp from 'lodash/fp';
export default {
  tags(state, getters, rootState, rootGetters){
    return _.uniqBy(_.map(state.all, x => x.tag));
  },
  plotDatas(state, getters, rootState, rootGetters){
    return fp.pipe(
      fp.toArray,
      fp.flatten,
      fp.groupBy(x => `${x.experiment_id}${x.tag}`),
      fp.mapValues((v, k) => {
        const experiment = _.find(rootState.experiment.all, e => e.id === v[0].experiment_id)
        return {
          x: _.map(v, row => row.x),
          y: _.map(v, row => row.y),
          mode: 'markers+lines',
          type: 'scatter',
          name: experiment? experiment.tag : "",
          tag: v[0].tag,
        };
      }),
      fp.toArray
    )(state.all)
  },
  charts(state, getters, rootState, rootGetters){
    return fp.pipe(
      fp.groupBy(x => x.tag),
      fp.mapValues((v, k) => ({
        title: v[0].tag,
        plotData: v,
      })),
      fp.toArray
    )(getters.plotDatas)
  },
}
