import JsonApi from './JsonApi';
import * as ms from '@/services/models';

export default class ExperimentApi extends JsonApi {
  all() {
    return this._get('api/experiment/all').then(res => ({
      ...res,
      data: res.data.map(x => new ms.Experiment(x)),
    }));
  }
}
