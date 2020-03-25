import React, { FormEvent }  from 'react';
import fp from 'lodash/fp';

export interface IProps {
  defaultValue: string;
  onInput: (value: string) => void;
}

export default class TextInput extends React.Component<IProps> {
  delayedOnInput = fp.debounce(300)(this.props.onInput)
  onChange = (e: FormEvent<HTMLInputElement>)  => {
    e.persist();
    return this.delayedOnInput(e.currentTarget.value);
  }

  render = () => {
    const {defaultValue} = this.props;
    return (
      <input
        className='input'
        defaultValue={defaultValue}
        onChange={this.onChange}
      />
    );
  }
}
