import React from 'react';
import styled from 'styled-components';
import { AutoSizer } from 'react-virtualized';
import Plot from 'react-plotly.js';
import {ITransition, IPoint } from '~/models/interfaces';


const Layout = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  width:100%;
`;
export interface IProps {
  transition: ITransition;
  points: IPoint[];
}
export default class Transition extends React.Component<IProps>{
  getPlotData = () => {
    const { transition, points } = this.props;
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

    } as any;
  }

  render = () => {
    const plotData = this.getPlotData();
    const plotLayout = this.getPlotLayout();
    return (
      <Layout>
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
      </Layout>
    );
  }
}

