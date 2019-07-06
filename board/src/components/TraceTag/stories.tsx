import React from 'react'
import { TargetType, StatusLevel } from '~/core/enums'
import { storiesOf } from '@storybook/react';
import moment from 'moment';
import Component from '.';
import { ITarget, ITrace } from '~/core/models'; 

storiesOf("TraceTag", module)
  .add('simple', () => {
    const sensor: ITarget = {
      id: 'sensor-1',
      name: 'CP1_TEMP',
      unit: 'Pa',
      chamberId:'chamber-1',
      categoryname: null,
      value:100,
      type:TargetType.SENSOR,
      status: StatusLevel.NOTSET,
    }

    const trace: ITrace = {
      id: 'trace-1',
      targetId: 'sensor-1',
      fromDate: moment().format(),
      toDate: moment().format(),
      points: [],
    }

    return (
      <Component
        target={sensor}
        trace={trace}
        onDelete={(traceId:string) => {console.log(traceId)}}
      />
    );
  });
