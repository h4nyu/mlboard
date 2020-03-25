import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";


export interface IRoute {
  path: string; 
  component: React.ComponentType;
}

export interface IProps {
  routes: IRoute[];
}
const Component = (props: IProps) => {
  const { routes } = props;
  return (
    <Router>
      {
        routes.map((x: IRoute) => <Route key={x.path} {...x} />)
      }
    </Router>
  );
};
export default Component;
