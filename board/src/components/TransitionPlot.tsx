import React from 'react';
import styled from 'styled-components';
import AutoSizer from "react-virtualized-auto-sizer";
import * as styles from '~/styles';
import { 
  ITransition,
  ITraceSegment,
  ITrace,
} from '~/core/models';
import Plot from 'react-plotly.js';
import {Map} from 'immutable';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  ${styles.card}
  height: 250px;
`;

const Header = styled.div`
  height: 1.5em;
  ${styles.text}
  font-size: 1em;
  padding: 0.5em;
`;

const PlotContainer = styled.div`
  flex: 1;
`;

export interface IProps {
  transition: ITransition;
  traceSegmentMap: Map<string, ITraceSegment>;
  traceMap: Map<string, ITrace>;
}
export class TransitionPlot extends React.Component<IProps> {
  getTraceName = () => {
    const {
      traceMap,
      transition,
    } = this.props;
    const trace = traceMap.get(transition.traceId);
    if(trace){
      return trace.name;
    }else{
      return "";
    }
  }
  getPlotData = () => {
    const {
      traceSegmentMap,
      transition,
    } = this.props;
    const segment = traceSegmentMap.get(transition.traceId);
    if(segment){
      return [
        {
          x: segment.points.map(x => x.ts),
          y: segment.points.map(x => x.value),
          type: 'scatter',
          mode: 'lines+points',
          marker: {color: 'red'},
        },
      ];
    }else{
      return [];
    }
  }
  getPlotLayout = () => {
    return {
      showlegend: false,
      margin: {
        r: 50,
        t: 5,
        b: 50,
        l: 50,
      },
      axis: {
        type: 'date'
      },
      yaxis: {
        title: {
          font: {
            size: 12,
          },
        },
        fixedrange: true,
      },
    };
  }
  getPlotConfig = () => {
    return {
      displayModeBar: false
    };
  }

  render = (): React.ReactElement => {
    const plotData = this.getPlotData();
    const plotLayout = this.getPlotLayout();
    const plotConfig = this.getPlotConfig();
    const traceName = this.getTraceName();
    return (
      <Layout>
        <Header>
          {traceName}
        </Header>
        <PlotContainer >
          <AutoSizer>
            {
              ({height, width}) => (
                <Plot
                  data={plotData}
                  layout={{
                    ...plotLayout,
                    height: height,
                    width: width,
                  }}
                  config={plotConfig}
                />
              )
            }
          </AutoSizer>
        </PlotContainer>
      </Layout>
    );
  }
}


