import React from 'react'
import { storiesOf } from '@storybook/react';
import {IMaintenanceLog} from '~/core/models';
import moment from 'moment';
import Component from '.';

storiesOf("MaintenanceLog", module)
  .add('simple', () => {
    const maintenanceLog: IMaintenanceLog = {
      id: 'maintenanceLog-1',
      maintenanceId: 'maintenance-1',
      occurredDate: moment().format()
    }
    return (
      <Component
        maintenanceLog={maintenanceLog}
        onDelete={(id) => {console.log(id)}}
      />
    );
  });
