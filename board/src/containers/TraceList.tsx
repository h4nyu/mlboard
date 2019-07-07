import React from 'react'
import { 
  ITrace 
} from '~/core/models'; 
import styled from 'styled-components';
import {Map} from 'immutable';
import {IProps as IChildProps} from '~/connectors/TraceListItem';

const Container = styled.div`
  display: grid;
  grid-area: content;
  grid-template-areas: 
  "header"
  "value";
  padding: 0.5em;
  &:hover {
    background-color: #EEEEEE;
  };
`

const HeaderArea = styled.div`
  grid-area: header;
`

const ValueArea = styled.div`
  grid-area: value;
`

interface IProps {
  traceSet: Map<string, ITrace>;
  Child: React.FC<IChildProps>;
}
export default class TraceList extends React.Component<IProps> {
  render = () => {
    const {traceSet, Child} = this.props
    return (
      <div className='card'>
        {
          traceSet.toList().map(x => (
            <Child
              trace={x}
            />
          ))
        }
      </div>
    )
  }
}

