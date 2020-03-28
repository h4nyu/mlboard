import React from 'react';
import MainPage from '~/pages/MainPage';
import { Redirect } from "react-router";
import ConfigPage from '~/pages/ConfigPage';

export default [
  {
    path: "/",
    component: <Redirect to="/transitions" />
  },
  {
    path: "/transitions",
    component: <MainPage/>,
  },
  {
    path: "/config",
    component: <ConfigPage/>,
  },
];
