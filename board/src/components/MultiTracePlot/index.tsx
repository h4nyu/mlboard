import React from 'react'
import SkipPanel from '~/components/SkipPanel';
import RangeDatetimeInput from '~/components/RangeDatetimeInput';
import Check from '~/components/Check'
import {
  ITrace,
  ITarget,
  IPoint,
  IMultiTrace,
} from '~/core/models'
import Plot from 'react-plotly.js'
import styled from 'styled-components'
import fp from 'lodash/fp'
import moment from 'moment'



const Layout = styled.div`
  display: grid;
  grid-template-areas:
  "switch skip finder copy close"
  "plot   plot plot   plot plot"
  "tags   tags tags   tags tags";
  grid-template-columns: auto 1fr auto auto auto;
` 
const PlotArea = styled.div`
  grid-area: plot;
  width: 100%;
  height: 150px;
  padding: 0.5em;
`
const FinderArea = styled.div`
  grid-area: finder;
  padding: 0.5em;
`

const SkipArea = styled.div`
  grid-area: skip;
  padding: 0.5em;
`

const CloseArea = styled.div`
  grid-area: close;
  padding: 0.5em;
`

const CopyArea = styled.div`
  grid-area: copy;
  padding: 0.5em;
`

const SwitchArea = styled.div`
  grid-area: switch;
  padding: 0.5em;
`

const TagsArea = styled.div`
  grid-area: tags;
  padding: 0.5em;
  display: flex;
  flex-wrap: wrap;
`

export interface IMultiTracePlotProps {
  multiTrace: IMultiTrace
  targetSet: {[id:string]: ITarget}
  traceSet: {[id: string]: ITrace}
  onCopy: (id:string) => void
  onShift: (id:string, interval: number) => void
  onIntervalChange: (id:string, interval: number) => void
  onRangeChange: (id:string, fromDate: string, toDate:string) => void
  onScatter: (id:string) => void
  onClose: (id:string) => void
  onDeleteTrace: (id:string, traceId:string) => void
  onFromDateChange: (id:string, datetime:string) => void
  onToDateChange: (id:string, datetime:string) => void
  onSelect: (id: string) => void
}
export default class MultiTracePlot extends React.Component<IMultiTracePlotProps> {
  getLegends = (traces:ITrace[]) => {
    const { targetSet } = this.props
    return traces
      .map(x => ({
        id: x.id,
        name: targetSet[x.targetId]!.name
      }))
      .filter(x => Boolean(x.name))
  }
  getTraces = ():ITrace[] => {
    const { multiTrace, traceSet } = this.props
    return fp.flow(
      fp.map((x:string) => traceSet[x]),
      fp.filter((x:ITrace) => Boolean(x)),
    )(multiTrace.traceIds)
  }

  getPlotData = (traces:ITrace[]) => {
    const { targetSet, multiTrace, } = this.props
    return traces.map(x => {
      const target = targetSet[x.targetId]
      const traceIdx = fp.findIndex((y:ITrace) => y.id == x.id)(traces)
      let yaxis: string | undefined = undefined
      if(traceIdx === 1){
        yaxis = 'y2'
      }
      let data:any = {
        x: x.points.map(t => moment(t.ts).local().format()),
        y: x.points.map(t => t.value),
        type: 'scattergl',
        mode: multiTrace.isScatter ? "markers" : "lines",
        name: `${target.name} (${target.unit})`,
      }
      if(yaxis){
        data = {
          ...data,
          yaxis,
        }
      }
      return data
    })
  }
  getPlotLayout = (traces:ITrace[]) => {
    const {multiTrace, targetSet} = this.props
    let range: string[] | null = null
    if(traces.length > 0){
      range = [traces[0].fromDate, traces[0].toDate]
    }
    let yaxis2:any | undefined = undefined
    if(traces.length === 2){
      const target = targetSet[traces[1].targetId]
      if(target){
        yaxis2 = {
          title: target.unit ? `${target.name} (${target.unit})` : target.name,
          side: 'right',
          type: 'liner',
          overlaying: 'y',
          fixedrange: true,
        }
      }
    }

    let title: string | undefined = undefined 
    if((traces.length === 2) || (traces.length === 1)){
      const target = targetSet[traces[0].targetId]
      if(target){
        title = target.unit ? `${target.name} (${target.unit})` : target.name
      }
    }

    let layout:any = {
      showlegend: false,
      margin: {
        r: 55,
        t: 5,
        b: 50,
        l: 55,
      },
      xaxis: {
        type: 'date',
        range,
      },
      yaxis: {
        fixedrange: true,
        title,
      },
    }
    if(yaxis2){
      layout = {
        ...layout,
        yaxis2
      }
    }
    return layout
  }

  handleRelayout = (e: any) => {
    if (e['xaxis.range[0]'] && e['xaxis.range[1]']) {
      const fromDate = moment(e['xaxis.range[0]'])
      const toDate = moment(e['xaxis.range[1]'])
      const { multiTrace, onRangeChange } = this.props
      if(fromDate < toDate){
        onRangeChange(
          multiTrace.id,
          fromDate.format(),
          toDate.format(),
        )
      }
    }
  }

  render = () => {
    const {
      multiTrace,
      onCopy,
      onShift,
      onIntervalChange,
      onRangeChange,
      onScatter,
      onClose,
      onDeleteTrace,
      onSelect,
      onFromDateChange,
      onToDateChange,
    } = this.props
    const traces = this.getTraces()
    const plotLayout = this.getPlotLayout(traces)
    const plotData = this.getPlotData(traces)
    const legends = this.getLegends(traces)
    const {handleRelayout} = this
    console.info(plotLayout);
    console.info(plotData);
    return (
      <Layout onClick={() => onSelect(multiTrace.id)}>
        <PlotArea>
          <Plot 
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            data={plotData}
            layout={plotLayout}
            onRelayout={handleRelayout}
          />
        </PlotArea>
        <FinderArea>
          <RangeDatetimeInput
            fromDate={multiTrace.fromDate}
            toDate={multiTrace.toDate}
            onFromDateChange={x => onFromDateChange(multiTrace.id, x)}
            onToDateChange={x => onToDateChange(multiTrace.id, x)}
            onSubmit={(x, y) => onRangeChange(multiTrace.id, x, y)}
          />
        </FinderArea>
        <SkipArea>
          <SkipPanel
            interval={multiTrace.interval}
            onIntervalChange={x => onIntervalChange(multiTrace.id, x)}
            onShift={x => onShift(multiTrace.id, x)}
          />
        </SkipArea>
        <CloseArea>
          <a className="delete" onClick={() => onClose(multiTrace.id)}></a>
        </CloseArea>
        <CopyArea>
          <a className="button" onClick={() => onCopy(multiTrace.id)}>
            copy
          </a>
        </CopyArea>
        <SwitchArea>
          <Check 
            value={multiTrace.isScatter}
            onClick={() => onScatter(multiTrace.id)}
          >
            <span> Scatter </span>
          </Check>
        </SwitchArea>
        <TagsArea className="field is-grouped is-grouped-multiline">
          {
            legends.map(x => (
              <div
                key={x.id}
                className="control"
              >
                <div className='tags has-addons' >
                  <span className='tag is-primary'>{x.name}</span>
                  <a
                    className='tag is-delete'
                    onClick={() => onDeleteTrace(multiTrace.id, x.id)}
                  />
                </div>
              </div>
            ))
          }
        </TagsArea>
      </Layout>
    );
  }
}

