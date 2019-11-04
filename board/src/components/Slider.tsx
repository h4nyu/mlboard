import React, {FormEvent} from 'react';
import fp from 'lodash/fp';

export interface IProps {
  value: number;
  step: number;
  min: number;
  max: number;
  onInput: (value: number) => void;
}
const Component = (props: IProps) => {
  const {value, step, min, max, onInput} = props;

  const delayedOnInput = fp.debounce(100)(onInput);
  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    e.persist();
    delayedOnInput(Number(e.currentTarget.value));
  };
  return (
    <input 
      step={step} 
      min={min} 
      max={max} 
      value={value} 
      onChange={handleInput}
      type="range"
    />
  );
};
export default Component;

