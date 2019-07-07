import React from 'react';
import { 
  ITrace 
} from '~/core/models'; 
import styled from 'styled-components';

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
`;

const HeaderArea = styled.div`
  grid-area: header;
`;

const ValueArea = styled.div`
  grid-area: value;
`;

interface IProps {
  trace: ITrace;
  onSelect: (traceId: string) => void;
}
export default class TraceListItem extends React.Component<IProps> {
  render = () => {
    const {trace} = this.props;
    return (
      <div className='card'>
        <Container onClick={() => this.props.onSelect(trace.id)}>
          <HeaderArea>
            <a className="title is-4"> 
              {trace.name}
            </a>
          </HeaderArea>
          <ValueArea>
            <a className="is-size-6"> 
              {trace.value}
            </a>
          </ValueArea>
        </Container>
      </div>
    );
  }
}
