import { Map } from 'immutable';
import React from 'react';
import styled from 'styled-components';
import { AutoSizer } from 'react-virtualized';
import Plot from 'react-plotly.js';
import {ITransition, IPoint, ITrace } from '~/models/interfaces';


const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "title close"
    "plot plot";
  padding: 0.5em;
  margin: 0.25em;
  grid-template-columns: 1fr auto;
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

const Title = styled.span`
  grid-area: title;
  font-weight: bold;
`;
export interface IProps {
  transition: ITransition;
  traces: Map<string, ITrace>;
  segments: Map<string,IPoint[]>;
  onClose: (id: string) => void;
}
export default class Transition extends React.Component<IProps>{
  getPlotData = () => {
    const { transition, segments } = this.props;
    let points = segments.get(transition.id);
    if(points === undefined){
      return [] as any;
    }

    return [
      {
        x: points.map(t => t.ts.local().format()),
        y: points.map(t => t.value),
        mode: transition.isScatter ? "markers" : "markers+lines",
        type: "scattergl",
        marker: {
          size: 5,
        },
      },
    ] as any;
  }

  getPlotLayout = () => {
    return {
      margin: {
        r: 5,
        t: 5,
        b: 30,
        l: 50,
      },

    } as any;
  }
  getTitle = () => {
    const {transition, traces} = this.props;
    const trace = traces.get(transition.traceId);
    if(trace === undefined){
      return "";
    }
    return trace.tag;
  }

  render = () => {
    const plotData = this.getPlotData();
    const plotLayout = this.getPlotLayout();
    const title = this.getTitle();
    const {transition, onClose} = this.props;
    return (
      <Layout className="card">
        <Title> {title} </Title>
        <Close className="delete" onClick={() => onClose(transition.id)}/>
        <PlotArea>
          <AutoSizer>
            {({ height, width }) => {
              return (
                <Plot
                  data={plotData}
                  layout={{...plotLayout, height: height, width: width}}
                />
              );
            }}
          </AutoSizer>
        </PlotArea>
      </Layout>
    );
  }
}
