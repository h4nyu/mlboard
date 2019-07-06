import React, {FormEvent} from 'react'
import styled from 'styled-components'
import moment from 'moment'

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "fromDate icon toDate action";
  grid-template-columns: 1fr auto  1fr auto;
`

const FromDateArea = styled.div`
 grid-area: fromDate;
`
const ToDateArea = styled.div`
 grid-area: toDate;
`
const IconArea = styled.div`
 grid-area: icon;
 align-items: center;
 padding: 0.5em;
`
const ActionArea = styled.div`
 grid-area: action;
`
export interface IProps {
  fromDate: string
  toDate: string
  onSubmit: (fromDate: string, toDate:string) => void
  onFromDateChange: (datetime: string) => void
  onToDateChange: (datetime: string) => void
}
export default class RangeDatetimeInput extends React.Component<IProps> {
  toLocalDate = (value: string) => {
    return moment(value).format('YYYY-MM-DDTHH:mm:ss');
  }

  handleFromDateChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {onFromDateChange} = this.props
    if(onFromDateChange){
      onFromDateChange(e.currentTarget.value)
    }
  }

  handleToDateChange = (e: FormEvent<HTMLInputElement>) => {
    const {onToDateChange} = this.props
    if(onToDateChange){
      onToDateChange(e.currentTarget.value)
    }
  }

  handleSubmit = () => {
    const {
      onSubmit,
      fromDate,
      toDate
    } = this.props
    if(onSubmit){
      onSubmit(fromDate, toDate)
    }
  }

  render = () => {
    const {fromDate, toDate} = this.props
    const localFromDate = this.toLocalDate(fromDate)
    const localToDate = this.toLocalDate(toDate)
    return (
      <Layout>
        <FromDateArea>
          <input
            className='input'
            type="datetime-local"
            step="1"
            required
            value={localFromDate}
            onChange={this.handleFromDateChange}
          />
        </FromDateArea>
        <IconArea>
          <i className="fas fa-arrows-alt-h"></i>
        </IconArea>
        <ToDateArea>
          <input
            className='input'
            type="datetime-local"
            step="1"
            required
            value={localToDate}
            onChange={this.handleToDateChange}
          />
        </ToDateArea>
        <ActionArea>
          <a 
            className="button" 
            onClick={this.handleSubmit}
          >
            確定
          </a>
        </ActionArea>
      </Layout>
    );
  }
}

