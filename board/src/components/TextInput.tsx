import React, { FormEvent }  from 'react';
import fp from 'lodash/fp';

export interface IProps {
  value: string;
  onInput: (value: string) => void;
}

export default class TextInput extends React.Component<IProps> {
  delayedOnInput = fp.debounce(300)(this.props.onInput)

  onChange = (e: FormEvent<HTMLInputElement>)  => {
    e.persist();
    return this.delayedOnInput(e.currentTarget.value);
  }

  render = () => {
    const {value} = this.props;
    return (
      <input
        className='input'
        value={value}
        onChange={this.onChange}
      />
    );
  }
}
