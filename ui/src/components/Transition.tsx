import moment, {Moment} from 'moment';
import { Map, Set } from 'immutable';
import React from 'react';
import styled from 'styled-components';
import {smooth} from '~/logics/converters';
import { AutoSizer } from 'react-virtualized';
import Slider from '~/components/Slider';
import {range} from 'lodash';
import Plot from '~/components/Plot';
import Check from '~/components/Check';
import {ITransition, ITrace, IWorkspace, ISegment } from '~/models/interfaces';


const Layout = styled.div<{isSelected: boolean}>`
  display: grid;
  grid-template-areas:
    "control close"
    "plot plot";
  padding: 0.5em;
  margin: 0.25em;
  grid-template-columns: 1fr auto auto auto;
  grid-template-rows: auto 1fr;
  border-left: 5px solid;
  border-color: ${props => props.isSelected ? "gray" : "white"};
`;

const PlotArea = styled.div`
  grid-area: plot;
  height: 200px;
  padding: 0.5em;
`;

const Close = styled.a`
  grid-area: close;
`;


const SmoothWeight = styled.span`
  width: 2em;
`;
const Item = styled.div`
  padding-left: 0.25em;
  padding-right: 0.25em;
  display: flex;
  align-items: center;
`;



const CotrolArea = styled.div`
  grid-area: control;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const formatDatetime = (value: Moment) => {
  return value.local().format("YYYY-MM-DD HH:mm:ss.SSS");
};
export interface IProps {
  currentId: string;
  transition: ITransition;
  relations: Set<{transitionId: string; traceId: string; segmentId: string}>;
  traces: Map<string, ITrace>;
  segments: Map<string,ISegment>;
  workspaces: Map<string,IWorkspace>;
  onClick: (transitionId: string) => void;
  onLegendCLick: (transitionId: string, traceId: string) => void;
  onWeightChange: (id: string, value: number) => void;
  onRangeChange: (id: string, fromDate: Moment, toDate: Moment) => void;
  onClose: (id: string) => void;
  onIsLogChange: (id: string) => void;
  onIsDatetimeChange: (id: string) => void;
}
export default class Transition extends React.Component<IProps>{
  getPlotData = () => {
    const { transition, relations, segments, traces } = this.props;
    return relations
      .filter(x => x.transitionId == transition.id)
      .map((rel) => {
        let segment = segments.get(rel.segmentId);
        let trace = traces.get(rel.traceId);
        if (segment === undefined || trace === undefined) {
          return  {};
        }

        const points = segment.points;
        let xValues = [];
        if(transition.isDatetime){
          xValues = points.map(p => formatDatetime(p.ts));
        }else{
          xValues = range(points.length);
        }

        let yValues = points.map(p => p.value);

        // show legends when data is empty 
        // https://github.com/plotly/plotly.js/issues/2861
        xValues = xValues.length > 0 ? xValues : [null];
        yValues = yValues.length > 0 ? yValues : [0];

        return {
          name: trace.name,
          traceId: trace.id,
          x: xValues,
          y: yValues.length > 1 ? smooth(yValues, transition.smoothWeight):yValues,
          mode: "markers" ,
          type: "scattergl",
          line: {
            width: 1,
          },
          opacity: 0.3,
          marker: {
            size: 6,
          },
        };
      }).toJS();
  }
  getPlotLayout = () => {
    const { transition } = this.props;
    return {
      margin: {
        r: 5,
        t: 5,
        b: 30,
        l: 80,
      },
      showlegend: true,
      legend: {
        orientation: "h",
      },
      xaxis: {
        range:[transition.fromDate, transition.toDate].map(formatDatetime),
        type: transition.isDatetime ? 'date': undefined,
        fixedrange: !transition.isDatetime,
      },
      yaxis: {
        type: transition.isLog ? 'log' : undefined,
        fixedrange: true,
      },
      showTips: false,
    } as any; 
  }

  handleRelayout = (e: any) => {
    if (e['xaxis.range[0]'] && e['xaxis.range[1]'] && this.props.transition.isDatetime) {
      const fromDate = moment(e['xaxis.range[0]']);
      const toDate = moment(e['xaxis.range[1]']);
      const {transition} = this.props;
      if(fromDate < toDate){
        this.props.onRangeChange(
          transition.id,
          fromDate,
          toDate,
        );
      }
    }
  }
  handleLegendClick = (e: any) => {
    const traceId = e.data[0].traceId;
    const transitionId = this.props.transition.id;
    this.props.onLegendCLick(transitionId, traceId);
  }

  render = () => {
    const plotData = this.getPlotData();
    const plotLayout = this.getPlotLayout();
    const {handleRelayout, handleLegendClick} = this;
    const {
      currentId,
      transition, 
      onClose, 
      onIsLogChange, 
      onIsDatetimeChange, 
      onWeightChange,
      onClick,
    } = this.props;
    return (
      <Layout 
        className="card" 
        isSelected={currentId===transition.id} 
        onClick={() => onClick(transition.id)}
      >
        <CotrolArea>
          <Item>
            <Slider
              step={0.01} 
              min={0} 
              max={0.99} 
              defaultValue={transition.smoothWeight} 
              onInput={x => onWeightChange(transition.id, x)}
            /> 
            <SmoothWeight>
              {transition.smoothWeight}
            </SmoothWeight>
          </Item>
          <Item>
            <Check value={transition.isLog} onClick={() => onIsLogChange(transition.id)}> Log </Check>
          </Item>
          <Item>
            <Check value={transition.isDatetime} onClick={() => onIsDatetimeChange(transition.id)}> Date </Check>
          </Item>
        </CotrolArea>
        <Close className="delete" onClick={() => onClose(transition.id)}/>
        <PlotArea>
          <AutoSizer>
            {({ height, width }) => {
              return (
                <Plot
                  data={plotData}
                  layout={{...plotLayout, height: height, width: width}}
                  config={{displayModeBar:false}}
                  onRelayout={handleRelayout}
                  onLegendCLick={handleLegendClick}
                />
              );
            }}
          </AutoSizer>
        </PlotArea>
      </Layout>
    );
  }
}
