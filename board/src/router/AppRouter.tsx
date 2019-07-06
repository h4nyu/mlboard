import React from "react";
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import TracePage from '~/pages/TracePage'
import MultiTracePage from '~/pages/MultiTracePage'
import CorrelationPage from '~/pages/CorrelationPage'
import EventHistoryPage from '~/pages/EventHistoryPage'
import EventSummaryPage from '~/pages/EventSummaryPage'
import TraceEventHistoryPage from '~/pages/TraceEventHistoryPage'
import TraceEventSummaryPage from '~/pages/TraceEventSummaryPage'
import MaintenancePage from '~/pages/MaintenancePage'

const AppRouter: React.FC<{}> = () => {
  return (
    <Router>
      <Redirect from='/' to='/trace/transition'/>
      <Route path="/trace/transition" exact component={TracePage} />
      <Route path="/trace/multi" exact component={MultiTracePage} />
      <Route path="/trace/correlation" exact component={CorrelationPage} />
      <Route path="/event/history" exact component={EventHistoryPage} />
      <Route path="/event/summary" exact component={EventSummaryPage} />
      <Route path="/trace-event/history" exact component={TraceEventHistoryPage} />
      <Route path="/trace-event/summary" exact component={TraceEventSummaryPage} />
      <Route path="/maintenance" exact component={MaintenancePage} />
    </Router>
  )
}

export default AppRouter
