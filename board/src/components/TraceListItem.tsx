import React from 'react'
import { 
  ITrace 
} from '~/core/models'; 
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 0.5em;
  &:hover {
    background-color: #EEEEEE;
  }
`

const Content = styled.div`
  grid-area: content;
`

interface ITraceListItemProps {
  trace: ITrace
  onSelect: (traceId: string) => void
}
export default class TraceListItem extends React.Component<ITraceListItemProps> {
  render = () => {
    const {trace} = this.props
    return (
      <div className='card'>
        <Container onClick={() => this.props.onSelect(trace.id)}>
          <Content>
            <a className="title is-4"> 
              {trace.name}
            </a>
          </Content>
        </Container>
      </div>
    )
  }
}
