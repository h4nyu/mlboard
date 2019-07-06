import React from 'react'
import { IMaintenanceLog } from '~/core/models'; 
import * as d3 from 'd3';
import styled from 'styled-components';
import moment from 'moment';

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "content action";
  grid-template-columns: 1fr auto;
`
const ContentArea = styled.div`
  grid-area: content;
  padding: 0.5em;
`

const ActionArea = styled.div`
  grid-area: action;
  padding: 0.5em;
`

interface IMaintenanceLogProps {
  maintenanceLog: IMaintenanceLog
  onDelete: (maintenanceLogId:string) => void
}

export default class MaintenanceLog extends React.Component<IMaintenanceLogProps> {

  getDate = () => {
    const {maintenanceLog} = this.props
    return moment(maintenanceLog.occurredDate).format('YYYY-MM-DD HH:mm:ss')
  }

  render = () => {
    const {maintenanceLog} = this.props
    return (
      <Layout className='card'>
        <ContentArea>
          { this.getDate() }
        </ContentArea>
        <ActionArea>
          <a className="delete is-medium"
            onClick={() => this.props.onDelete(maintenanceLog.id)}>
          </a>
        </ActionArea>
      </Layout>
    )
  }
}
