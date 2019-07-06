import React from 'react'
import styled from 'styled-components'
import {format} from 'd3';
import StatusLamp from '~/components/StatusLamp';
import TargetTag from "~/components/TargetTag";
import TraceLevel from "~/components/TraceLevel";
import {
  ITarget, 
  IChamber,
  ITraceLevel,
  IDiff
} from '~/core/models'


const ContentLayout = styled.div`
  display: grid;
  grid-area: content;
  grid-template-areas:
    "header header header header header header header"
    "status value  unit   level  diff   tag    action";
  grid-template-columns: auto auto auto 1fr auto auto auto;
  cursor: pointer;
  padding: 0.5em;
  &:hover {
    background-color: #EEEEEE;
  }
  height: 80px;
`

const HeaderArea = styled.div`
  grid-area: header;
  white-space: nowrap;
`

const TagArea = styled.div`
  grid-area: tag;
  padding: 0.1em;
  display: flex;
  align-items: center;
`

const StatusArea = styled.div`
  grid-area: status;
  display: flex;
  align-items: center;
`

const ValueArea = styled.div`
  grid-area: value;
  padding-right: 0.5em;
  display: flex;
  align-items: center;
`

const UnitArea = styled.div`
  grid-area: unit;
  display: flex;
  align-items: center;
`

const LevelArea = styled.div`
  white-space: nowrap;
  grid-area: level;
  padding: 0.2em;
  display: flex;
  align-items: center;
`
const DiffArea = styled.div`
  white-space: nowrap;
  grid-area: diff;
  padding: 0.2em;
  display: flex;
  align-items: center;
`

const ActionArea = styled.div`
  grid-area: action;
  display: flex;
  padding: 0.2em;
  align-items: center;
`

export interface IProps {
  target: ITarget
  chamberSet: {[id: string]: IChamber}
  traceLevelSet: {[id: string]: ITraceLevel}
  diffSet: {[id: string]: IDiff}
  onClick: (id: string) => void
  onEditTraceLevel:(id:string) => void
}
export default class TargetListItem extends React.Component<IProps> {
  getChamber = ():IChamber | undefined  => {
    const { chamberSet, target } = this.props
    return chamberSet[target.chamberId]
  }
  getTraceLevel = ():ITraceLevel | undefined => {
    const { traceLevelSet, target } = this.props
    return traceLevelSet[target.id]
  }
  getDiff = ():IDiff | undefined => {
    const { diffSet, target } = this.props
    return diffSet[target.id]
  }
  getTitle = ():string => {
    const {target} = this.props
    const chamber = this.getChamber()
    let base = ""
    if(chamber){
      base = base + `/${chamber.name}`
    }
    if(target.categoryname){
      base = base + `/${target.categoryname}`
    }
    base = base + `/${target.name}`
    return base
  }
  getValue = () => {
    const { target } = this.props
    if(target.value){
      return format('~s')(target.value) as string
    }else{
      return ""
    }
  }

  render = () => {
    const { 
      target, 
      onClick,
      onEditTraceLevel,
    } = this.props
    const traceLevel = this.getTraceLevel()
    const diff = this.getDiff()
    return (
      <ContentLayout className='card'>
        <HeaderArea 
          onClick={() => onClick(target.id)}
          className={"is-size-6"}
        >
          {this.getTitle()}
        </HeaderArea>
        <TagArea
          onClick={() => onClick(target.id)}
        >
          <TargetTag targetType={target.type} />
        </TagArea>
        <StatusArea 
          onClick={() => onClick(target.id)}
          className={'is-size-6'}
        >
          <StatusLamp
            status={target.status} >
          </StatusLamp>
        </StatusArea>
        <ValueArea 
          onClick={() => onClick(target.id)}
          className={'is-size-6'}
        >
          <span>{this.getValue()}</span>
        </ValueArea>
        <UnitArea 
          onClick={() => onClick(target.id)}
          className={'is-size-6'}
        >
          <span>{target.unit}</span>
        </UnitArea>
        <LevelArea
          onClick={() => onClick(target.id)}
        >
          {traceLevel ? <TraceLevel traceLevel={traceLevel} /> : null }
        </LevelArea>
        <DiffArea
          onClick={() => onClick(target.id)}
        >
          {diff ? <span className="is-size-6"> {diff.value.toFixed(2)} </span> : null}
        </DiffArea>
        <ActionArea>
          <a className="button is-small" onClick={() => onEditTraceLevel(target.id)}>
            閾値
          </a>
        </ActionArea>
      </ContentLayout>
    );
  }
}
