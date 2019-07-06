import React from 'react'
import { IChamber } from '~/core/models'
import { StatusLevel } from '~/core/enums'
import StatusLamp from '~/components/StatusLamp'
import SearchInput from '~/components/SearchInput'
import ChamberListItem from '~/components/ChamberListItem'
import StatusSelector from '~/components/StatusSelector'
import SelectCard from '~/components/SelectCard'
import VerticalCollapse from '~/components/VerticalCollapse'
import styled from 'styled-components'
import fp from "lodash/fp"
import _ from "lodash"

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "header "
    "search "
    "divider "
    "content ";
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto 1fr;
`

const Header = styled.div`
  grid-area: header;
`

const Search = styled.div`
  grid-area: search;
`

const Divider = styled.hr`
  grid-area: divider;
`

const Content = styled.div`
  grid-area: content;
  overflow-y: scroll;
`

interface IChamberListState {
  keyword: string
  statusLevel: StatusLevel
}
interface IChamberListProps {
  chamberSet: { [key: string]: IChamber }
  selectedIds: string[]
  onSelect: (chamberId: string) => void
}
export default class CopyChamberList extends React.Component<IChamberListProps, IChamberListState> {
  state = {
    keyword: "",
    statusLevel: StatusLevel.NOTSET,
  }


  handleInput = (text: string) => {
    this.setState({
      ...this.state,
      keyword: text
    }) 
  }

  isMatched = (chamber: IChamber) => {
    const {keyword} = this.state
    const searchStr = `${chamber.name} ${chamber.blockName}`
    return searchStr.includes(keyword)
  }

  getOrderedChambers = () => {
    const chambers: IChamber[] = Object.values(this.props.chamberSet)
    const {statusLevel} = this.state
    return fp.flow(
      fp.filter(this.isMatched),
      fp.filter(x => x.status >= statusLevel),
      fp.reverse,
      fp.sortBy(x => x.name),
      fp.sortBy(x => x.blockName),
    )(chambers);
  }

  getIsSelected = (chamberId: string) => {
    return _.includes(this.props.selectedIds, chamberId);
  }


  render = () => {
    return (
        <Container className={'card'}>
          <Header>
            <p className="card-header-title">
             コピー先チャンバー
            </p>
          </Header>
          <Search>
            <SearchInput
              onInput={this.handleInput}>
            </SearchInput>
          </Search>
          <Divider />
          <Content>
            {
              this.getOrderedChambers().map((x:IChamber) => (
                <SelectCard 
                  key={x.id}
                  isSelected={this.getIsSelected(x.id)}
                >
                  <ChamberListItem
                    chamber={x}
                    onSelect={this.props.onSelect}
                  />
                </SelectCard>
              ))
            }
          </Content>
        </Container>
    )
  }
}
