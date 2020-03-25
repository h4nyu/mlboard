import React from 'react';
const Plotly = require('plotly.js/dist/plotly-gl2d.min.js'); // eslint-disable-line
interface IProps {
  data: any;
  layout: any;
  config?: any;
  onRelayout?: (payload: any) => void;
  onLegendCLick?: (payload: any) => void;
}
interface State {
  ref: React.RefObject<HTMLDivElement>;
}
export default class ChartComponent extends React.Component<IProps, State>{
  constructor(props: IProps) {
    super(props);
    this.state = {ref:React.createRef<HTMLDivElement>()};
  }
  componentDidMount = () => {
    if(this.state.ref.current){
      Plotly.newPlot(this.state.ref.current, this.props.data, this.props.layout).then(
        (e: any) => {
          if(this.props.onRelayout){
            e.on("plotly_relayout", this.props.onRelayout);
          }
          if(this.props.onLegendCLick){
            e.on("plotly_legendclick", this.props.onLegendCLick);
          }
        }
      );
    }
  }
  static getDerivedStateFromProps(props: IProps, state: State){
    if(state.ref.current){
      Plotly.react(state.ref.current, props.data, props.layout, props.config);
    }
    return state;
  }
  componentWillUnmount = () => {
    if(this.state.ref.current){
      Plotly.purge(this.state.ref.current);
    }
  }


  render = () => {
    return (
      <div ref={this.state.ref}/>
    );
  }
}
