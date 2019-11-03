import {Moment} from 'moment';
import React from 'react';
import styled from 'styled-components';
import DatetimeInput from '~/components/DatetimeInput';

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "fromDate icon toDate";
  grid-template-columns: 1fr auto  1fr;
`;

const FromDateArea = styled.div`
 grid-area: fromDate;
 display: flex;
 align-items: center;
 justify-content: center;
`;
const ToDateArea = styled.div`
 grid-area: toDate;
 display: flex;
 align-items: center;
 justify-content: center;
`;
const IconArea = styled.div`
 grid-area: icon;
 display: flex;
 align-items: center;
 justify-content: center;
 padding-left: 0.5em;
 padding-right: 0.5em;
`;
export interface IProps {
  fromDate: Moment;
  toDate: Moment;
  onFromDateChange: (datetime: Moment) => void;
  onToDateChange: (datetime: Moment) => void;
}
export default class RangeDatetimeInput extends React.Component<IProps> {
  render = () => {
    const {
      fromDate, 
      toDate,
      onFromDateChange,
      onToDateChange,
    } = this.props;
    return (
      <Layout>
        <FromDateArea>
          <DatetimeInput
            value={fromDate}
            onChange={onFromDateChange}
          />
        </FromDateArea>
        <IconArea>
          <i className="fas fa-arrows-alt-h"></i>
        </IconArea>
        <ToDateArea>
          <DatetimeInput
            value={toDate}
            onChange={onToDateChange}
          />
        </ToDateArea>
      </Layout>
    );
  }
}
