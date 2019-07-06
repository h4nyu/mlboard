import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import StatusLamp from '~/components/StatusLamp';
import TargetTag from "~/components/TargetTag";
import TraceLevel from "~/components/TraceLevel";
import {
  IMaintenance,
  IChamber,
  ITraceLevel,
  IMaintenanceLog,
} from '~/core/models'
import fp from 'lodash/fp'


const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "content action";
  grid-template-columns: 1fr auto;
  padding: 0.5em;
  &:hover {
    background-color: #EEEEEE;
  }
` 
const ContentLayout = styled.div`
  display: grid;
  grid-area: content;
  grid-template-areas:
    "title  title title lastdatelabel level-title deadlinelabel"
    "status value unit  lastdate      level       deadline     ";
  grid-template-columns: auto auto 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 1fr;
`
const TitleArea = styled.div`
  grid-area: title;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
`
const LastDateLabelArea = styled.div`
  grid-area: lastdatelabel;
  padding: 0.2em;
  cursor: pointer;
  display: flex;
  align-items: center;
`
const LevelLabelArea = styled.div`
  grid-area: level-title;
  padding: 0.2em;
  cursor: pointer;
`
const DeadLineLabelArea = styled.div`
  grid-area: deadlinelabel;
  padding: 0.2em;
  cursor: pointer;
  display: flex;
  align-items: center;
`
const EditLabelArea = styled.div`
  grid-area: edit-title;
  padding: 0.2em;
  cursor: pointer;
`
const StatusArea = styled.div`
  grid-area: status;
  cursor: pointer;
  padding-right: 0.5em;
  display: flex;
  align-items: center;
`
const ValueArea = styled.div`
  grid-area: value;
  cursor: pointer;
  padding-right: 0.5em;
  display: flex;
  align-items: center;
`
const UnitArea = styled.div`
  grid-area: unit;
  cursor: pointer;
  display: flex;
  align-items: center;
`
const LastDateArea = styled.div`
  grid-area: lastdate;
  cursor: pointer;
  display: flex;
  align-items: center;
`
const LevelArea = styled.div`
  grid-area: level;
  cursor: pointer;
  display: flex;
  align-items: center;
`
const DeadLineArea = styled.div`
  grid-area: deadline;
  cursor: pointer;
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
  maintenance: IMaintenance
  chamberSet: {[id:string]: IChamber}
  traceLevelSet: {[id:string]: ITraceLevel}
  maintenanceLogSet: {[id:string]: IMaintenanceLog}
  onClick: (id: string) => void
  onDeleteClick: (id: string) => void
}

export default class MaintenanceListItem extends React.Component<IProps> {
  getChamber = ():IChamber|undefined => {
    const {maintenance, chamberSet} = this.props
    return chamberSet[maintenance.chamberId]
  }

  getTraceLevel = ():ITraceLevel|undefined => {
    const {maintenance, traceLevelSet} = this.props
    return traceLevelSet[maintenance.id]
  }
  getTitle = () => {
    const {maintenance} = this.props
    return `${this.getChamber()!.name} / ${maintenance.name}`;
  }

  getLatestDate = ():string|undefined => {
    const maintenanceLog = this.getMaintenanceLog()
    if(maintenanceLog){
      return moment(maintenanceLog.occurredDate).format('YYYY-MM-DD HH:mm:ss');
    }
  }
  getMaintenanceLog = ():IMaintenanceLog | undefined => {
    const {maintenanceLogSet, maintenance} = this.props
    const sortedlogs = fp.pipe(
      fp.toArray(),
      fp.filter((x:IMaintenanceLog) => x.maintenanceId === maintenance.id),
      fp.sortBy((x:IMaintenanceLog) => x.occurredDate),
      fp.reverse,
    )(maintenanceLogSet);
    if(sortedlogs.length > 0){
      return sortedlogs[0]
    }
  }

  getDeadLineDate = ():string | undefined => {
    const maintenanceLog = this.getMaintenanceLog()
    const traceLevel = this.getTraceLevel()
    if(maintenanceLog&&traceLevel){
      const date = maintenanceLog.occurredDate
      const level = traceLevel.errorLevel
      return moment(date).add(level,'days').format('YYYY-MM-DD HH:mm:ss');
    }
  }

  render = () => {
    const { 
      maintenance, 
      onDeleteClick,
      onClick,
    } = this.props
    return (
      <Layout 
        className='card'
      >
        <ContentLayout
          onClick={() => onClick(maintenance.id)}
        >
          <TitleArea>
            {this.getTitle()}
          </TitleArea>
          <LastDateLabelArea className={"is-size-7"}>
            最終メンテナンス日時
          </LastDateLabelArea>
          <DeadLineLabelArea className={"is-size-7"}>
            メンテナンス期日
          </DeadLineLabelArea>
          <StatusArea>
            <StatusLamp
              status={maintenance.status} >
            </StatusLamp>
          </StatusArea>
          <ValueArea>
            <span>{maintenance.value}</span>
          </ValueArea>
          <UnitArea>
            日
          </UnitArea>
          <LastDateArea>
            {this.getLatestDate()}
          </LastDateArea>
          <LevelArea>
            {this.getTraceLevel() ? <TraceLevel traceLevel={this.getTraceLevel()!} /> : null}
          </LevelArea>
          <DeadLineArea>
            {this.getDeadLineDate()}
          </DeadLineArea>
        </ContentLayout>
        <ActionArea>
          <button 
            className="button is-small"
            onClick={() => onDeleteClick(maintenance.id)}
          >
            <span className="icon">
              <i className="fa fa-trash"/>
            </span>
          </button>
        </ActionArea>
      </Layout>
    );
  }
}
