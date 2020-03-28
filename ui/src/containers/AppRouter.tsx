import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";


export interface IRoute {
  path: string; 
  component: React.ReactNode;
}

export interface IProps {
  routes: IRoute[];
}
const Component = (props: IProps) => {
  const { routes } = props;
  return (
    <Router>
      <Switch>
        {
          routes.map((x: IRoute) => <Route exact key={x.path} path={x.path} >{x.component}</Route>
          )
        }
      </Switch>
    </Router>
  );
};
export default Component;
