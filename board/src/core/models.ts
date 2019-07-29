export interface IPoint {
  value: number;
  ts: string;
}

export interface ITrace {
  id: string;
  name: string;
  value: number;
}

export interface ITraceSegment {
  id: string;
  traceId: string;
  points: IPoint[];
}

export interface ITransition {
  id: string;
  traceId: string;
  traceSegmentId: string;
}

