import JsonApi from './JsonApi';
import * as ms from '@/services/models';

export default class ExperimentApi {
  all() {
    return JsonApi.get('api/experiment/all').then(res => ({
      ...res,
      data: res.data.map(x => new ms.Experiment(x)),
    }));
  }
  deleteBy({id}){
    return JsonApi.delete('api/experiment', {
      id: id,
    });
  }
}
