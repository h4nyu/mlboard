import React, { FormEvent }  from 'react';
import moment, {Moment} from 'moment';


const FORMAT = 'YYYY-MM-DDTHH:mm';
const toLocalDate = (value: Moment) => {
  return value.format(FORMAT);
};
interface IState {
  value: string;
}
export interface IProps {
  onChange: (value: Moment) => void;
  value: Moment;
}
export default class DatetimeInput extends React.Component<IProps, IState> {
  state = {
    value: moment().format(FORMAT)
  }
  componentDidMount = () => {
    this.setState({
      value: toLocalDate(this.props.value)
    });
  }
  static getDerivedStateFromProps(nextProps: IProps) {
    return {
      value:toLocalDate(nextProps.value)
    };
  }

  handleChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {onChange} = this.props;
    if(moment(e.currentTarget.value).isValid()){
      this.setState({
        value:e.currentTarget.value
      });
      onChange(moment(e.currentTarget.value, FORMAT));
    }
  }
  render = () => {
    return (
      <input
        type="datetime-local"
        step="60"
        required
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}
