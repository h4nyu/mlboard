import React from 'react';
const Plotly = require('plotly.js/dist/plotly-basic.min.js');
interface IProps {
  data: any;
  layout: any;
  onRelayout: (payload: any) => void;
}
type State = {
  ref: React.RefObject<HTMLDivElement>
}
export default class ChartComponent extends React.Component<IProps, State>{
  constructor(props: IProps) {
    super(props)
    this.state = {ref:React.createRef<HTMLDivElement>()}
  }
  componentDidMount = () => {
    // this.setState({current: this.myRef.current})
    if(this.state.ref.current){
      Plotly.newPlot(this.state.ref.current, this.props.data, this.props.layout).then(
        (e:any) => {
          e.on("plotly_relayout", this.props.onRelayout);
          e.on('plotly_click', function(){
          console.log(e)
          })
        }
      );
    }

    // if (this.state.current){
    //   console.log("aaaaaaaaaaaaaaaa")
    //   console.log(a)
    //   console.log("aaaaaaaaaaaaaaaa")
    // }
  }
  static getDerivedStateFromProps(props:IProps, state:State){
    console.log(props);
    if(state.ref.current){
      Plotly.react(state.ref.current, props.data, props.layout)
    }
    // if(state.chart){
    //   state.chart.config = props.config;
    //   state.chart.data = props.config.data;
    //   state.chart.options = props.config.options;
    //   state.chart.update({
    //     duration:0,
    //   });
    // }
    return state;
  }
  componentWillUnmount = () => {
    // if(this.myRef.current){
    //   Plotly.purge(this.myRef.current);
    // }
  }


  render = () => {
    return (
      <div ref={this.state.ref}/>
    )
  }
}
