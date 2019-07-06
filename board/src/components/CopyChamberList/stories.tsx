import React from 'react'
import { storiesOf } from '@storybook/react';
import { IChamber } from '~/core/models';
import fp from 'lodash/fp';
import _ from 'lodash';
import ChamberList from '.';
import {targetMock, chamberMock} from "~/mocks"

storiesOf('CopyChamberList', module)
  .add('order by stateLevel', () => {
    const chamberSet: {[key: string]: IChamber} = {
      'aaa': {
        ...chamberMock,
        id: 'aaa',
      },
      'bbb': {
        ...chamberMock,
        id: 'bbb',
      }
    }

    const selectedIds: string[] = ['asdf'];
    return (
      <div 
        style={{
          height: '300px'
        }}
      >
        <ChamberList
          chamberSet={chamberSet}
          selectedIds={selectedIds}
          onSelect={(chamberId) => {console.log(chamberId)}}
        />
      </div>
    );
  });

