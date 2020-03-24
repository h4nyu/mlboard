import React, {FormEvent} from 'react';
import fp from 'lodash/fp';
import TextInput from './TextInput'
import {Trace} from '~/models'
import { Map } from 'immutable';
import styled from 'styled-components';


const AutoComplete = styled.div`
  position: absolute;
  width: 100%;
`;

const Item = styled.div`
  hover: {
    background-color: #e9e9e9;
  }
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
          <AutoComplete className="list is-hoverable">
            {
              traces.toList().map(x => (
                <Item className="list-item">
                  {x.name}
                </Item>
              ))
            }
          </AutoComplete>
          ):null
        }
      </div>
    );
  }
};

