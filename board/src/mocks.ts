import styled from 'styled-components'
import { 
  ITarget, 
  IChamber, 
  ITrace,
  IPoint,
  ITraceLevel,
  ITraceEvent,
  IEventSection,
  IMaintenance,
  IMaintenanceLog,
  IMultiTrace,
  ICorrelation,
  ITransition,
  IDiff,
} from '~/core/models'
import { 
  TargetType, 
  StatusLevel,
  AxisType,
  TraceEventName,
} from '~/core/enums'
import moment from 'moment'

export const targetMock: ITarget = {
  id: "fdsfafsa",
  name: "target name",
  unit: 'fdasdfa',
  chamberId: "chamberId",
  categoryname: 'categoryname',
  value: 12.0,
  type: TargetType.SENSOR,
  status: StatusLevel.ERROR,
}

export const chamberMock: IChamber = {
  id: 'chamberid',
  name: 'chambername',
  blockName: 'blockName',
  warningCount: 0,
  errorCount: 1,
  status: StatusLevel.NOTSET,
}

export const traceEventMock: ITraceEvent = {
  id: 'eventSectionid',
  configId:"configId",
  occurredDate:moment().format(),
  name: TraceEventName.ABOVE_ERROR
}

export const eventSectionMock: IEventSection = {
  id: 'eventSectionid',
  fromDate: moment().format(),
  toDate: moment().add(1, 'days').format(),
  status: StatusLevel.HARD_WARNING,
  code: 500,
  message:"TRC4 WARNING",
  chamberId:"chamberid",
  substractId:"C3CCQ910PUE"
}

export const traceLevelMock: ITraceLevel = {
  id: 'traceid',
  warningLevel: 2,
  errorLevel: 3,
}

export const traceMock: ITrace = {
  id: 'traceid',
  targetId: 'targetId',
  fromDate: moment().format(),
  toDate: moment().format(),
  points: [
    { value: 1, ts: moment().format() },
    { value: 2, ts: moment().format() }
  ]
}

export const maintenanceMock: IMaintenance = {
  id: 'maintenanceid',
  name: 'maintenance',
  chamberId: 'chamberid',
  value: 5,
  collectDate: moment().format(),
  status: StatusLevel.INFO
}

export const maintenanceLogMock: IMaintenanceLog = {
  id: 'maintenanceLogid',
  maintenanceId: 'maintenanceid',
  occurredDate: moment().format()
}

export const multiTraceMock: IMultiTrace = {
  id: 'multiTraceId',
  traceIds: ['aaa'],
  fromDate: moment().format(),
  toDate: moment().format(),
  isScatter: false,
  interval: 60,
}

export const correlationMock: ICorrelation = {
  id: 'correlationId',
  xTraceId: null,
  yTraceIds:  [],
  inputAxisType: AxisType.X_AXIS,
  fromDate: moment().format(),
  toDate: moment().format(),
  isScatter: false,
}

export const transitionMock: ITransition = {
  id: 'correlationId',
  targetId: "aaa",
  chamberId: 'bbb',
  traceId: 'bbb',
  isScatter: false,
  isLocked: false,
  isLog: false,
}

export const diffMock: IDiff = {
  id: 'targetid',
  value:15
}
