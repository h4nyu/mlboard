import React from 'react'
import styled from 'styled-components'
import { TabType } from '~/core/enums'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const TabArea = styled.div`
  min-height: 41px;
`

interface IEventTabState {
  tabType: TabType
}

export default class EventTab extends React.Component<{}, IEventTabState> {

  state = {
    tabType: TabType.SUMMARY
  }

  handleTabSelect = (type: TabType) => {
    this.setState({
      tabType:type 
    }) 
  }

  getStyle = (type:TabType) => {
    const tabType = this.state.tabType
    if (tabType === type) {
      return 'is-active';
    }
    return "";
  }

  getTabContent = () => {
    const tabType =this.state.tabType
    if(tabType === TabType.SUMMARY){
      return ( 
        <div>Summary Table Here!! </div>
      )
    }else if(tabType === TabType.HISTORY){
      return ( 
        <div>History Table Here!! </div>
      )
    }
  }

  render = () => {
    const tabs = [
      {
        lable: '集計',
        type: TabType.SUMMARY,
      },
      {
        lable: '履歴',
        type: TabType.HISTORY,
      },
    ];
    return (
      <Layout>
        <TabArea className={'tabs is-fullwidth is-marginless'}>
          <ul>
            {tabs.map(tab => (
              <li 
                className={this.getStyle(tab.type)}
                onClick={() => this.handleTabSelect(tab.type)}>
                <a>
                  {tab.lable}
                </a>
              </li>
            ))}
          </ul>
        </TabArea>
        {this.getTabContent()}
      </Layout>
    );
  }
}
