import React from 'react'
import {
  ITransition,
  ITarget,
  IChamber,
  ITrace,
  ITraceLevel,
  IMultiTrace,
} from '~/core/models'
import { IProps as IItemProps } from '~/connectors/MultiTracePlot'
import RangeDatetimeInput from '~/components/RangeDatetimeInput'
import SkipPanel from '~/components/SkipPanel'
import SelectCard from '~/components/SelectCard'
import fp from 'lodash/fp'
import uuid from 'uuid'
import styled from 'styled-components'

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "header"
    "add"
    "content";
  grid-template-columns: auto;
  grid-template-rows: auto auto 1fr;
  height: 100%;
`
const HeaderArea = styled.div`
  grid-area: header;
`
const ContentArea = styled.div`
  grid-area: content;
  overflow-y: auto;
`

const AddArea = styled.div`
  grid-area: add;
  display flex;
  flex-direction column;
  align-items stretch;
`

interface ITransitionListProps {
  multiTraceSet: {[id: string]: IMultiTrace}
  Child: React.FC<IItemProps>
  selectedId: string | null 
  onAdd: () => void
}
export default class MultiTraceList extends React.Component<ITransitionListProps> {
  getItems = () => {
    const {
      multiTraceSet,
    } = this.props
    return fp.toArray(multiTraceSet)
  }
  getIsSelected = (id:string) => {
    const {selectedId} = this.props
    return id === selectedId
  }

  render = () => {
    const {
      multiTraceSet,
      Child,
      onAdd,
    } = this.props
    return (
      <Layout>
        <HeaderArea>
          <p className="card-header-title">
            多系列
          </p>
        </HeaderArea>
        <AddArea>
          <div className="button" onClick={onAdd}>
            Add
          </div>
        </AddArea>
        <ContentArea>
          <hr />
          {
            this.getItems().map(x => (
            <SelectCard
              key={x.id}
              isSelected={this.getIsSelected(x.id)}
            >
              <Child multiTrace={x} />
            </SelectCard>
            ))
          }
        </ContentArea>
      </Layout>
    );
  }
}
