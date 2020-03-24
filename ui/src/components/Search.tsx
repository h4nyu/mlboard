import React, {FormEvent} from 'react';
import fp from 'lodash/fp';
import TextInput from './TextInput'
import {Trace} from '~/models'
import { Map } from 'immutable';
import styled from 'styled-components';

const Layout = styled.div`
  width: 100%;
`;

const AutoComplete = styled.div`
  z-index: 30;
  position: absolute;
  width: 100%;
`;

const Item = styled.div`
  width: 100%;
  hover: {
    background-color: #e9e9e9;
  }
  cursor: pointer;
`;

type State = {
  isActive:boolean;
}
export interface IProps {
  defaultValue: string;
  traces:Map<string, Trace>;
  onInput: (value: string) => void;
  onSelect: (traceId: string) => void;
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
    const {defaultValue, traces, onSelect} = this.props;
    const {isActive} = this.state;
    const {handleInput, } = this;
    return (
      <Layout
        onMouseEnter={() => this.toggle()}
        onMouseLeave={() => this.toggle()}
      >
        <TextInput
          defaultValue={String(defaultValue)}
          onInput={(v) => handleInput(v)}
        />
        <AutoComplete className="list is-hoverable">
          {
            isActive? (
              traces.toList().map(x => (
                <Item className="list-item" onClick={() => onSelect(x.id)}>
                  {x.name}
                </Item>
              ))
            ):null
          }
        </AutoComplete>
      </Layout>
    );
  }
};

