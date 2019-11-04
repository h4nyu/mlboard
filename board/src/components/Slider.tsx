import React, {FormEvent} from 'react';
import fp from 'lodash/fp';


export interface IProps {
  defaultValue: number;
  step: number;
  min: number;
  max: number;
  onInput: (value: number) => void;
}
export default class DatetimeInput extends React.Component<IProps> {
  delayedOnInput = fp.debounce(200)(this.props.onInput)
  handleInput = (e: FormEvent<HTMLInputElement>) => {
    e.persist();
    const inputValue = Number(e.currentTarget.value);
    this.delayedOnInput(inputValue);
  };
  render = () => {
    const {step, min, max, defaultValue} = this.props;
    const {handleInput} = this;
    return (
      <input 
        defaultValue={String(defaultValue)}
        step={step} 
        min={min} 
        max={max} 
        onChange={handleInput}
        type="range"
      />
    );
  }
};
