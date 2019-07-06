import React from 'react'
import moment from 'moment'
import EventSummaryTable from '.';
import { storiesOf } from '@storybook/react';
import {chamberMock, eventSectionMock} from "~/mocks"

storiesOf("EventSummaryTable", module)
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
      'aaa': {
        ...eventSection,
        id:'aaa',
      },
      'bbb': {
        ...eventSection,
        id:'bbb',
      }
    }

    return (
      <EventSummaryTable
        chamberSet={chamberSet}
        eventSectionSet={eventSectionSet}
        fromDate={moment().format()}
        toDate={moment().add(1, "days").format()}
        onRangeChange={console.log}
        onFileSave={console.log}
        onFromDateChange={console.log}
        onToDateChange={console.log}
      />
    )
  })

