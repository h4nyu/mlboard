import React, {FormEvent} from 'react';
import fp from 'lodash/fp';
import TextInput from './TextInput'
import {Trace} from '~/models'
import { Map } from 'immutable';
import styled from 'styled-components';


const Item = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  flex-direction: column;
  grid-template-areas: "ta space up";
  grid-template-columns: auto 1fr auto;
  padding: 0.5em;
  cursor: pointer;
`;

type State = {
  isActive:boolean;
}
export interface IProps {
  defaultValue: string;
  traces:Map<string, Trace>;
  onInput: (value: string) => void;
}
export default class DatetimeInput extends React.Component<IProps, State> {
  constructor(props:IProps){
    super(props)
    this.state = {isActive: false}
  }
  delayedOnInput = fp.debounce(200)(this.props.onInput)
  handleInput = (value: string) => {
    const inputValue = value;
    this.delayedOnInput(inputValue);
  };
  toggle = () => {
    this.setState({
      isActive: !this.state.isActive
    })
  }
  render = () => {
    const {defaultValue, traces} = this.props;
    const {isActive} = this.state;
    const {handleInput} = this;
    return (
      <div
        onMouseEnter={() => this.toggle()}
        onMouseLeave={() => this.toggle()}
      >
        <TextInput
          defaultValue={String(defaultValue)}
          onInput={(v) => handleInput(v)}
        />
        {
          isActive?(
          <Item className="card">
            {
              traces.toList().map(x => (
                <div>
                  {x.name}
                </div>
              ))
            }
          </Item>
          ):null
        }
      </div>
    );
  }
};

