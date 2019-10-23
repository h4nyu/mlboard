import React from 'react';

interface IProps {
  AppRouter: React.ComponentType<{}>;
  Loading: React.ComponentType<{}>;
  onInit: () => void;
}
export default class App extends React.Component<IProps> {
  componentDidMount = () => {
    this.props.onInit();
  }
  render = () => {
    const { AppRouter, Loading } = this.props;
    return (
      <React.Fragment>
        <AppRouter />
        <Loading />
      </React.Fragment>
    );
  }
}
