import React, { FormEvent }  from 'react';
import moment from 'moment';


const FORMAT = 'YYYY-MM-DDTHH:mm';
interface IState {
  value: string;
}
export interface IProps {
  onChange: (value: string) => void;
  value: string;
}
export default class DatetimeInput extends React.Component<IProps, IState> {
  state = {
    value: moment().format(FORMAT)
  }

  toLocalDate = (val: string) => {
    return moment(val).format(FORMAT);
  }

  componentWillMount = () => {
    this.setState({
      value:this.toLocalDate(this.props.value)
    });
  }
  componentWillReceiveProps = (props: IProps) => {
    this.setState({
      value:this.toLocalDate(props.value)
    });
  }

  handleChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {onChange} = this.props;
    if(moment(e.currentTarget.value).isValid()){
      this.setState({
        value:e.currentTarget.value
      });
      onChange(moment(e.currentTarget.value, FORMAT).toISOString());
    }
  }
  render = () => {
    return (
      <input
        className='input'
        type="datetime-local"
        step="60"
        required
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}
