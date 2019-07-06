import React from 'react'
import styled from 'styled-components'
import { List, AutoSizer, ListRowProps} from 'react-virtualized';
import {IChamber, ITarget, IDiff} from '~/core/models'
import { StatusLevel } from '~/core/enums'
import VerticalCollapse from "~/components/VerticalCollapse"
import SearchInput from '~/components/SearchInput'
import StatusSelector from '~/components/StatusSelector'
import {IProps as IChildProps} from '~/connectors/TargetListItem'
import fp from 'lodash/fp'

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "header  sort"
    "search  selector"
    "divider divider"
    "content content";
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto 1fr;
`

const HeaderArea = styled.div`
  grid-area: header;
`
const SortArea = styled.div`
  grid-area: sort;
  display: flex;
  align-items: center;
`
const SearchArea = styled.div`
  grid-area: search;
`

const SelectorArea = styled.div`
  grid-area: selector;
`

const ContentArea = styled.div`
  grid-area: content;
`

interface ITargetListState {
  keyword: string
  statusLevel: StatusLevel
  sortKey: string
}

interface ISortOption {
  key: string
  label: string 
}

interface ITargetListProps {
  chamberIds: string[]
  targetSet: {[id: string]: ITarget}
  diffSet: {[id: string]: IDiff}
  onReloadClick: () => void
  Child: React.FC<IChildProps>
}
export default class TargetList extends React.Component<ITargetListProps, ITargetListState> {
  state = {
    keyword: '',
    statusLevel: StatusLevel.NOTSET,
    sortKey: 'status'
  }

  sortOptions:ISortOption[] = [
    {
      key: 'status',
      label:'状態'
    },
    {
      key: 'diff',
      label:'変化率'
    },
  ]

  getItems = ():ITarget[] => {
    const {targetSet, chamberIds} = this.props
    const {statusLevel} = this.state
    const targets = fp.toArray(targetSet)
    return fp.flow(
      fp.filter(this.isMatched),
      fp.filter(x => chamberIds.includes(x.chamberId)),
      fp.filter(x => x.status >= statusLevel),
      fp.sortBy(x => x.name),
      fp.sortBy(x => x.categoryname),
      fp.sortBy(this.getScore)
    )(targets)
  }

  getSortStatus = (key: string) => {
    const {sortKey} = this.state
    if(key === sortKey){
      return "button is-small is-info"
    }else
      return "button is-small"
  }

  getScore = (x:ITarget) =>  {
    const {sortKey} = this.state
    const {diffSet} = this.props
    if(sortKey == "status"){
      return - x.status
    }else if(sortKey == 'diff'){
      const diff = diffSet[x.id];
      if(diff){
        return - diff.value;
      }else{
        return 0;
      }
    }
  }

  isMatched = (target: ITarget) => {
    const {keyword} = this.state
    const searchStr = `${target.name} ${target.categoryname}`
    return searchStr.includes(keyword)
  }

  handleStatusSelect = (status: StatusLevel) => {
    this.setState({
      ...this.state,
      statusLevel: status
    }) 
  }

  handleInput = (text: string) => {
    this.setState({
      ...this.state,
      keyword: text
    }) 
  }

  handleSortClick = (key: string) => {
    this.setState({
      ...this.state,
      sortKey: key
    }) 
  }

  rowRenderer = (items:ITarget[], listRowProps:ListRowProps) => {
    const { Child, diffSet } = this.props
    const item = items[listRowProps.index]
    return (
      <div key={item.id} style={listRowProps.style}>
        <Child
          target={item}
        />
      </div>
    )
  }



  render = () => {
    const { Child, onReloadClick, diffSet } = this.props
    const {
      getSortStatus, 
      sortOptions, 
      handleSortClick,
      rowRenderer,
    } = this
    const items = this.getItems()
    return (
      <VerticalCollapse>
        <Layout className={'card'}>
          <HeaderArea>
            <p className="card-header-title">
              系列
            </p>
          </HeaderArea>
          <SortArea>
            <a className="button is-small"
              onClick={onReloadClick}
            >
              <span>
                <i className="fas fa-sync-alt"></i>
              </span>
            </a>
            {
              sortOptions.map((x:ISortOption) => {
                return (
                  <span
                    key={x.key}
                    className={getSortStatus(x.key)}
                    onClick={() => handleSortClick(x.key)}
                  >
                    {x.label}
                  </span>
                )
              })
            }
          </SortArea>
          <SearchArea>
            <SearchInput
              onInput={this.handleInput}
            />
          </SearchArea>
          <SelectorArea>
            <StatusSelector
              onChange={this.handleStatusSelect}
            />
          </SelectorArea>

          <ContentArea>
            <AutoSizer>
              {({ height, width }) => (
                <List
                  style={{ outline: 'none' }}
                  width={width}
                  height={height}
                  rowHeight={80}
                  rowRenderer={(x) => rowRenderer(items, x)}
                  rowCount={items.length}
                />)}
            </AutoSizer>
          </ContentArea>
        </Layout>
      </VerticalCollapse>
    )
  }
}

