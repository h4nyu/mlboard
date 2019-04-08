import JsonApi from './JsonApi';

export default class TraceApi extends JsonApi {
  searchRange(sensorId, fromDate, toDate) {
    this.payload.method = {
      name: 'search_range',
      args: [],
      kwargs: {
        sensor_id: sensorId,
        from_date: fromDate,
        to_date: toDate,
      },
    };
    return this._post(this.url, this.payload);
  }
}
