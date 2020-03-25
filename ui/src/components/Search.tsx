import React, {FormEvent} from 'react';
import fp from 'lodash/fp';
import TextInput from './TextInput';
import {Trace} from '~/models';
import { Map } from 'immutable';
import styled from 'styled-components';


const Layout = styled.div`
  width: 100%;
  position: relative;
`;

const AutoComplete = styled.div`
  z-index: 30;
  position: absolute;
  width: 100%;
  overflow-y: auto;
  max-height:30em;
`;

const Item = styled.div`
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #EEEEEE;
  };
`;

interface State {
  isActive: boolean;
}
export interface IProps {
  defaultValue: string;
  traces: Map<string, Trace>;
  onInput: (value: string) => void;
  onSelect: (traceId: string) => void;
}
export default class DatetimeInput extends React.Component<IProps, State> {
  constructor(props: IProps){
    super(props);
    this.state = {isActive: false};
  }
  delayedOnInput = fp.debounce(200)(this.props.onInput)
  handleInput = (value: string) => {
    const inputValue = value;
    this.delayedOnInput(inputValue);
  };
  active = () => {
    this.setState({
      isActive: true
    });
  }

  deactive = () => {
    this.setState({
      isActive: false
    });
  }
  render = () => {
    const {defaultValue, traces, onSelect} = this.props;
    const {isActive} = this.state;
    const {handleInput, } = this;
    return (
      <Layout
        onMouseEnter={() => this.active()}
        onMouseLeave={() => this.deactive()}
        onFocus={ () => this.active() } 
      >
        <TextInput
          defaultValue={String(defaultValue)}
          onInput={(v) => handleInput(v)}
        />
        {
          isActive? (
            <AutoComplete className="list">
              {
                traces.toList().map(x => (
                  <Item className="list-item" key={x.id} onClick={() => onSelect(x.id)}>
                    {x.name}
                  </Item>
                ))
              }
            </AutoComplete>
          ):null
        }
      </Layout>
    );
  }
};

