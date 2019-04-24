import JsonApi from './JsonApi';

export default class TraceApi {
  filterBy({experimentId}) {
    return JsonApi.get('/api/trace/filter-by', {
      experimentId
    });
  }
}
