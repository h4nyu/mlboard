import moment, {Moment} from 'moment';
import { Map } from 'immutable';
import React from 'react';
import styled from 'styled-components';
import {format} from 'd3';
import {smooth} from '~/logics/converters';
import { AutoSizer } from 'react-virtualized';
import Slider from '~/components/Slider';
import Plot from '~/components/Plot';
import {max, range, min, last}  from 'lodash';
import Check from '~/components/Check';
import {ITransition, IPoint, ITrace, IWorkspace } from '~/models/interfaces';


const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "title statistics control close"
    "plot plot plot plot";
  padding: 0.5em;
  margin: 0.25em;
  grid-template-columns: 1fr auto auto auto;
  grid-template-rows: auto 1fr;
`;
const PlotArea = styled.div`
  grid-area: plot;
  height: 150px;
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

const Title = styled.span`
  grid-area: title;
  font-weight: bold;
`;

const Statistic = styled.span`
`;

const StatisticsArea = styled.div`
  grid-area: statistics;
  display: flex;
  flex-direction: row;
`;

const CotrolArea = styled.div`
  grid-area: control;
  display: flex;
  flex-direction: row;
`;
const formatDatetime = (value: Moment) => {
  return value.local().format("YYYY-MM-DD HH:mm:ss.SSS");
};
export interface IProps {
  transition: ITransition;
  traces: Map<string, ITrace>;
  segments: Map<string,IPoint[]>;
  workspaces: Map<string,IWorkspace>;
  onWeightChange: (id: string, value: number) => void;
  onRangeChange: (id: string, fromDate: Moment, toDate: Moment) => void;
  onClose: (id: string) => void;
  onIsLogChange: (id: string) => void;
  onIsDatetimeChange: (id: string) => void;
  onIsScatterChange: (id: string) => void;
}
export default class Transition extends React.Component<IProps>{
  getPlotData = (values: number[]) => {
    const { transition, segments } = this.props;
    let points = segments.get(transition.id);
    if(points === undefined){
      return [] as any;
    }
    let x = [];
    if(transition.isDatetime){
      x = points.map(p => formatDatetime(p.ts));
    }else{
      x = range(points.length);
    }
    const y = values;
    return [
      {
        x: x,
        y: y.length > 1 ? smooth(y, transition.smoothWeight) : y,
        mode: transition.isScatter ? "markers" : "markers+lines",
        type: "scattergl",
        marker: {
          size: 5,
        },
      },
    ] as any;
  }
  formatValue = (value: number): string => {
    return format('~s')(value);
  }
  getValues = () => {
    const { transition, segments } = this.props;
    let points = segments.get(transition.id);
    if(points === undefined){return [];}
    const values = points.map((x: IPoint) => x.value);
    return values;
  }
  getCount = (values: number[]): number => {
    return values.length;
  }

  getMax = (values: number[]): number|undefined => {
    return max(values);
  }
  getMin = (values: number[]): number|undefined => {
    return min(values);
  }

  getPlotLayout = (values: number[]) => {
    const { transition } = this.props;
    const lastValue = values.length > 0 ? last(values) : 0;
    return {
      margin: {
        r: 5,
        t: 5,
        b: 30,
        l: 80,
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
      shapes: [
        {
          type: 'line',
          xref: 'paper',
          x0: 0,
          x1: 1,
          y0: lastValue,
          y1: lastValue,
          line:{
            color: 'orange',
            width: 1,
          }
        },

      ],
    } as any; 
  }
  getTitle = (): string => {
    const {transition, traces, workspaces} = this.props;
    const trace = traces.get(transition.traceId);
    if(trace === undefined){ return ""; }
    const workspace = workspaces.get(trace.workspaceId);
    if(workspace === undefined){ return trace.name; }
    return `${workspace.name}/${trace.name}`;
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

  render = () => {
    const values = this.getValues();
    const plotData = this.getPlotData(values);
    const plotLayout = this.getPlotLayout(values);
    const title = this.getTitle();
    const maxValue = this.getMax(values);
    const minValue = this.getMin(values);
    const countValue = this.getCount(values);
    const {handleRelayout, formatValue} = this;
    const {
      transition, onClose, 
      onIsScatterChange, onIsLogChange, 
      onIsDatetimeChange, onWeightChange 
    } = this.props;
    return (
      <Layout className="card">
        <Title> {title} </Title>
        <StatisticsArea>
          <Item>
            {maxValue ? <Statistic>Max: {formatValue(maxValue)}</Statistic> : null}
          </Item>
          <Item>
            {minValue ? <Statistic>Min: {formatValue(minValue)}</Statistic> : null}
          </Item>
          <Item>
            <Statistic>Count: {formatValue(countValue)}</Statistic>
          </Item>
        </StatisticsArea>
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
            <Check value={transition.isScatter} onClick={() => onIsScatterChange(transition.id)}> Scatter </Check>
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
                  onRelayout={handleRelayout}
                />
              );
            }}
          </AutoSizer>
        </PlotArea>
      </Layout>
    );
  }
}
