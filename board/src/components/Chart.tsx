import React from 'react';
import {Chart, ChartConfiguration} from "chart.js";

interface IProps {
  config: any;
}
type State = {
  chart: Chart | null
}
export default class ChartComponent extends React.Component<IProps, State>{
  private myRef = React.createRef<HTMLCanvasElement>()
  constructor(props: IProps) {
    super(props)
    this.state = {chart:null}
  }
  componentDidMount = () => {
    if (this.myRef.current){
      this.setState({
        chart:new Chart(this.myRef.current, this.props.config)
      })
    }
  }
  static getDerivedStateFromProps(props:IProps, state:State){
    if(state.chart){
      state.chart.config = props.config;
      state.chart.data = props.config.data;
      state.chart.options = props.config.options;
      state.chart.update({
        duration:0,
      });
    }
    return state;
  }
  componentWillUnmount = () => {
    if(this.state.chart){
      this.state.chart.destroy();
    }
  }


  render = () => {
    return (
      <canvas ref={this.myRef} height={0} width={0}/>
    )
  }
}
