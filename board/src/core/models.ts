export interface IPoint {
  value: number;
  ts: string;
}

export interface ITrace {
  id: string;
  configId: string;
  fromDate:string;
  toDate:string;
  points: IPoint[];
}
