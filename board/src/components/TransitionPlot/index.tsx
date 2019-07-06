import React from 'react'
import { 
  ITraceLevel,
  ITrace,
  IChamber,
  ITarget,
  ITransition,
} from '~/core/models'; 
import styled from 'styled-components'
import moment from "moment"
import Plot from 'react-plotly.js'
import Check from "~/components/Check"

const Layout = styled.div`
  display: grid;
  padding: 0.5em;
  grid-template-areas:
  "header switch close"
  "plot plot scale";
  grid-template-columns: 1fr auto auto;
`

const HeaderArea = styled.div`
  grid-area: header;
  padding-top: 0.5em;
  white-space: nowrap;
`

const PlotArea = styled.div`
  grid-area: plot;
  width: 100%;
  height: 150px;
  padding: 0.5em;
`

const SwitchArea = styled.div`
  grid-area: switch;
  padding-right: 1em;
  display: flex;
  flex-direction: row;
`

const SwitchItem = styled.div`
  padding: 0.5em;
`

const CloseArea = styled.div`
  grid-area: close;
`

export interface IProps {
  transition: ITransition
  targetSet: {[id:string]: ITarget}
  chamberSet: {[id: string]: IChamber}
  traceSet: {[id: string]: ITrace}
  traceLevelSet: {[id: string]: ITraceLevel}
  onClose: (id: string) => void
  onLock: (id:string) => void
  onLog: (id:string) => void
  onScatter: (id:string) => void
  onRangeChange: (id:string, fromDate:string, toDate:string) => void
  onEditTraceLevel:(id:string) => void
}
export default class Transition extends React.Component<IProps> {
  getTitle = (chamber:IChamber|undefined, target:ITarget|undefined) => {
    return `${chamber ? chamber.name : "unknown"} / ${target ? target.name : 'unknown'}`
  }

  getTarget = ():ITarget|undefined => {
    const {transition, targetSet} = this.props
    return targetSet[transition.targetId]
  }

  getChamber = ():IChamber|undefined => {
    const {transition, chamberSet} = this.props
    return chamberSet[transition.chamberId]
  }

  getTraceLevel = ():ITraceLevel|undefined => {
    const {transition, traceLevelSet} = this.props
    return traceLevelSet[transition.targetId]
  }

  getTrace = ():ITrace|undefined => {
    const {transition, traceSet} = this.props
    return traceSet[transition.traceId]
  }

  getPlotData = (trace:ITrace) => {
    const {transition} = this.props
    return [
      {
        x: trace.points.map(t => moment(t.ts).local().format()),
        y: trace.points.map(t => t.value),
        mode: transition.isScatter ? "markers" : "markers+lines",
        type: "scattergl",
        marker: {
          size: 5,
        },
      },
    ];
  }

  handleRelayout = (e: any) => {
    if (e['xaxis.range[0]'] && e['xaxis.range[1]']) {
      const fromDate = moment(e['xaxis.range[0]'])
      const toDate = moment(e['xaxis.range[1]'])
      const {transition} = this.props
      if(fromDate < toDate){
        this.props.onRangeChange(
          transition.id,
          fromDate.format(),
          toDate.format(),
        )
      }
    }
  }
  getPlotLayout = (traceLevel:ITraceLevel|undefined, target:ITarget|undefined, trace:ITrace|undefined) => {
    const { transition } = this.props
    let shapes:{
      type: string
      xref: string
      x0: number
      x1: number
      y0: number
      y1: number
      line: {
        color: string
        width: number
        dash: string
      }
    }[] = [];
    if(traceLevel){
      const baseProps = {
        type: 'line',
        xref: 'paper',
        x0: 0,
        x1: 1,
      }
      shapes = [
        {
          ...baseProps,
          y0: traceLevel.warningLevel,
          y1: traceLevel.warningLevel,
          line:{
            color: 'orange',
            width: 3,
            dash:'dot'
          }
        },
        {
          ...baseProps,
          y0: traceLevel.errorLevel,
          y1: traceLevel.errorLevel,
          line:{
            color: 'red',
            width: 3,
            dash:'dot'
          }
        },
      ]
    }
    return {
      showlegend: false,
      margin: {
        r: 5,
        t: 5,
        b: 30,
        l: 50,
      },
      xaxis: {
        range: trace ? [trace.fromDate, trace.toDate] : [],
        type: 'date'
      },
      yaxis: {
        title: {
          text: target ? target.unit : "",
          font: {
            size: 12,
          },
        },
        fixedrange: true,
        type: transition.isLog ? "log" : "liner",
      },
      shapes,
    };
  }

  render = () => {
    const {
      transition,
      onLock,
      onScatter,
      onClose,
      onLog,
      onEditTraceLevel,
    } = this.props
    const {handleRelayout} = this
    const traceLevel = this.getTraceLevel()
    const target = this.getTarget()
    const chamber = this.getChamber()
    const trace = this.getTrace()

    const title = this.getTitle(chamber, target)
    const plotLayout= this.getPlotLayout(
      traceLevel,
      target,
      trace,
    )
    const plotData = trace ? this.getPlotData(trace) : []

    return (
      <Layout className="card">
        <HeaderArea>
          <span className="is-6"> {title} </span>
        </HeaderArea>
        <PlotArea>
          <Plot
            style={{ width: "100%", height: "100%" }}
            useResizeHandler={true}
            data={plotData}
            layout={plotLayout}
            onRelayout={handleRelayout}
          />
        </PlotArea>
        <SwitchArea>
          <SwitchItem>
            <button className="button is-small" onClick={() => onEditTraceLevel(transition.targetId)}>
              閾値
            </button>
          </SwitchItem>
          <SwitchItem>
            <Check 
              value={transition.isScatter}
              onClick={() => onScatter(transition.id)}
            >
              <span> Scatter </span>
            </Check>
          </SwitchItem>
          <SwitchItem>
            <Check 
              value={transition.isLocked}
              onClick={() => onLock(transition.id)}
            >
              <span> Lock </span>
            </Check>
          </SwitchItem>
          <SwitchItem>
            <Check 
              value={transition.isLog}
              onClick={() => onLog(transition.id)}
            >
              <span> Log </span>
            </Check>
          </SwitchItem>
        </SwitchArea>
        <CloseArea>
          <button className="delete" onClick={() => onClose(transition.id)}>
          </button>
        </CloseArea>
      </Layout>
    );
  }
}
