import React from 'react'
import { storiesOf } from '@storybook/react';
import {IMaintenanceLog} from '~/core/models';
import moment from 'moment';
import Component from '.';

storiesOf("MaintenanceLogList", module)
  .add('simple', () => {
    const maintenanceLog1: IMaintenanceLog = {
      id: 'maintenanceLog-1',
      maintenanceId: 'maintenance-1',
      occurredDate: moment().format()
    }
    const maintenanceLog2: IMaintenanceLog = {
      id: 'maintenanceLog-2',
      maintenanceId: 'maintenance-1',
      occurredDate: moment().add(2, 'days').format()
    }
    const maintenanceLog3: IMaintenanceLog = {
      id: 'maintenanceLog-3',
      maintenanceId: 'maintenance-1',
      occurredDate: moment().add(1, 'days').format()
    }
    const maintenanceLogSet = {
      [maintenanceLog1.id]:maintenanceLog1,
      [maintenanceLog2.id]:maintenanceLog2,
      [maintenanceLog3.id]:maintenanceLog3,
    }
    return (
      <Component
        maintenanceLogSet={maintenanceLogSet}
        maintenanceId={'maintenanceId-1'}
        occurredDate={moment().format()}
        onOccuredDateChange={console.log}
        onDelete={console.debug}
        onAdd={console.debug}
      />
    )
  })
