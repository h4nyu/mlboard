import { 
  TargetType, 
  StatusLevel, 
  AxisType, 
  TraceEventName 
} from './enums'

export interface IChamber {
  id: string
  name: string
  blockName: string
  status: StatusLevel
  errorCount: number
  warningCount: number
}

export interface ITarget {
  id: string
  name: string
  chamberId: string
  status: StatusLevel
  type: TargetType
  unit: string | null
  value: number | null
  categoryname: string | null
}

export interface IPoint {
   value: number
   ts: string
}

export interface ITrace {
  id: string
  targetId: string 
  fromDate: string 
  toDate: string 
  points: IPoint[]
}

export interface IMaintenanceLog {
  id: string
  maintenanceId:string 
  occurredDate:string 
}

export interface ITraceLevel {
  id: string
  warningLevel: number
  errorLevel: number
}

export interface IDiff {
  id: string
  value: number
}

export interface ITraceEvent {
  id: string
  configId: string 
  occurredDate: string 
  name: TraceEventName 
}

export interface IEventSection {
  id: string
  fromDate: string 
  toDate: string 
  status: StatusLevel 
  code: number
  message:string 
  chamberId: string 
  substractId: string 
}

export interface ITransition {
  id: string
  chamberId: string
  targetId: string
  traceId: string
  isLocked: boolean
  isScatter: boolean
  isLog: boolean
}

export interface IMaintenance {
  id: string
  name: string
  chamberId: string
  collectDate: string
  value: number 
  status:StatusLevel
}

export interface IMultiTrace {
  id: string
  traceIds: string[]
  fromDate: string
  toDate: string
  isScatter: boolean
  interval: number
}

export interface ICorrelation {
  id: string
  fromDate: string
  toDate: string
  isScatter: boolean
  xTraceId: string | null
  yTraceIds:  string[]
  inputAxisType: AxisType
}

export interface ITraceDiff {
  id: string
  value: number
}
