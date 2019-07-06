import React, { FormEvent }  from 'react'
import styled from 'styled-components'
import moment from 'moment'

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "content action";
  grid-template-columns: 1fr auto;
`

const ActionArea = styled.div`
 grid-area: action;
`

const ContentArea = styled.div`
 grid-area: content;
`

export interface IDatetimeInputProps {
  onSubmit: (value: string) => void
  onChange?: (value: string) => void
  value: string
}
export default class DatetimeInput extends React.Component<IDatetimeInputProps> {
  static defaultProps = {
    onChange: () => {}
  }
  state = {
    value: moment().format()
  }
  getLocalDate = () => {
    const {value} = this.props
    return moment(value).format('YYYY-MM-DDTHH:mm:ss');
  }
  handleChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {onChange} = this.props
    if(onChange){
      onChange(e.currentTarget.value)
    }
  }
  handleSubmit = () => {
    const {onSubmit} = this.props
    if(onSubmit){
      onSubmit(this.state.value)
    }
  }
  render = () => {
    const {value} = this.state
    const localValue = this.getLocalDate()
    return (
      <Layout className="card">
        <ContentArea>
          <input
            className='input'
            type="datetime-local"
            step="1"
            required
            value={localValue}
            onChange={this.handleChange}
          />
        </ContentArea>
        <ActionArea>
          <a 
            className="button" 
            onClick={this.handleSubmit}
          >
            確定
          </a>
        </ActionArea>
      </Layout>
    )
  }
}


