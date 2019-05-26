export default class TraceGroup {
  constructor({ 
    id, 
    name,
    traceIds=[],
  }) {
    this.id = id;
    this.name = name;
    this.traceIds = traceIds;
  }
}


