import React from 'react'
import { 
  IChamber 
} from '~/core/models'; 
import { 
  StatusLevel 
} from '~/core/enums'; 
import StatusLamp from '~/components/StatusLamp';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "header header"
    "content action";
  grid-template-columns: 1fr auto;
  padding: 0.5em;
  &:hover {
    background-color: #EEEEEE;
  }
`

const Header = styled.div`
  grid-area: header;
`

const Content = styled.div`
  grid-area: content;
`

interface IChamberListItemProps {
  chamber: IChamber
  onSelect: (chamberId: string) => void
}
export default class ChamberListItem extends React.Component<IChamberListItemProps> {
  get chamberName(){
    return `${this.props.chamber.name}`
  }
  render = () => {
    const {chamber} = this.props
    return (
      <div className='card'>
        <Container onClick={() => this.props.onSelect(chamber.id)}>
          <Header>{chamber.blockName}</Header>
          <Content>
            <a className="title is-4"> 
              <StatusLamp status={chamber.status} /> 
              {chamber.name}
            </a>
          </Content>
        </Container>
      </div>
    )
  }
}
