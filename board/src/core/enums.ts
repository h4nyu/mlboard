export enum StatusLevel {
  CRITICAL = 50,
  ERROR = 40,
  HARD_WARNING = 35,
  WARNING = 30,
  INFO = 20,
  NOTSET = 0,
}


export enum TargetType {
  SENSOR = "SENSOR",
  PROCESS = "PROCESS",
}

export enum TabType {
  SUMMARY = "SUMMARY",
  HISTORY = "HISTORY",
}

export enum AxisType {
  X_AXIS = "X_AXIS",
  Y_AXIS = "Y_AXIS",
}

export enum TraceEventName {
  ABOVE_ERROR = "ABOVE_ERROR",
  ABOVE_WARNING = "ABOVE_WARNING",
}
