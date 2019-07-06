import React from 'react'
import moment from 'moment'
import EventHistoryTable from '.';
import { storiesOf } from '@storybook/react';
import {chamberMock, eventSectionMock} from "~/mocks"

storiesOf("EventHistoryTable", module)
  .add('default', () => {
    const chamberSet = {
      'aaa': {
        ...chamberMock,
        id: 'aaa',
      }
    }

    const eventSection = {
      ...eventSectionMock,
      chamberId:"aaa"
    }

    const eventSectionSet = {
      ['aaa']: {
        ...eventSection,
        id: 'aaa'
      },
      ['bbb']: {
        ...eventSection,
        id: 'bbb'
      },
    }

    return (
      <EventHistoryTable
        chamberSet={chamberSet}
        eventSectionSet={eventSectionSet}
        fromDate={moment().format()}
        toDate={moment().add(1, "days").format()}
        onRangeChange={console.debug}
        onFromDateChange={console.log}
        onToDateChange={console.log}
        onFileSave={console.debug}
        onDateClick={console.log}
      />
    )
  })

