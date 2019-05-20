import JsonApi from './JsonApi';
import Experiment from '@/services/models/Experiment';

export default class ExperimentApi {
  all() {
    return JsonApi.get('api/experiment/all').then(res => ({
      ...res,
      data: res.data.map(x => new Experiment(x)),
    }));
  }
  deleteBy({id}){
    return JsonApi.delete('api/experiment', {
      id: id,
    });
  }
}
