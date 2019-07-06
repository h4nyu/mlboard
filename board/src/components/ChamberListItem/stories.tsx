import React from 'react'
import { storiesOf } from '@storybook/react';
import moment from 'moment';
import Component from '.';
import {
  IChamber,
} from '~/core/models';

storiesOf("ChamberListItem", module)
  .add('simple', () => {
    const chamber: IChamber = {
      id: 'id-10',
      name: 'EV',
      blockName: 'BLOCK0',
      errorCount: 10,
      warningCount: 20,
      status: 30,
    }
    return (
      <Component
        chamber={chamber}
        onSelect={(chamberId: string) => {}}
      />
    );
  });
