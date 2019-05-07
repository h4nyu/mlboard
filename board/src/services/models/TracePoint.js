export default class TracePoint {
  constructor({ 
    x, 
    y,
    ts,
    traceId,
  }) {
    this.x = x;
    this.y = y;
    this.ts = ts;
    this.traceId = traceId;
  }
}

