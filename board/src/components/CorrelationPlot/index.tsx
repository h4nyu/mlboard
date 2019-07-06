import React from 'react'
import SkipPanel from '~/components/SkipPanel';
import RangeDatetimeInput from '~/components/RangeDatetimeInput';
import Check from '~/components/Check'
import {
  ITrace,
  ITarget,
  IPoint,
  IMultiTrace,
  ICorrelation,
} from '~/core/models'
import { AxisType } from "~/core/enums"
import Plot from 'react-plotly.js'
import styled from 'styled-components'
import fp from 'lodash/fp'
import moment from 'moment'
import uuid from 'uuid'



const Layout = styled.span`
  display: grid;
  grid-template-areas:
  "switch select finder copy close"
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

const SelectArea = styled.div`
  grid-area: select;
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
interface IAxisSwitchProps {
  axisType: AxisType
  onChange: (axisType: AxisType) => void
}
const AxisSwitch = (props: IAxisSwitchProps) => {
  const {axisType, onChange} = props
  if(props.axisType === AxisType.X_AXIS){
    return (
      <div>
        <Check 
          value={true} 
          onClick={() => onChange(AxisType.X_AXIS)}
        > 
          X軸
        </Check>
        <Check 
          value={false} 
          onClick={() => onChange(AxisType.Y_AXIS)}
        > 
          Y軸
        </Check>
      </div>
    )
  }else{
    return (
      <div>
        <Check 
          value={false} 
          onClick={() => onChange(AxisType.X_AXIS)}
        > 
          X軸
        </Check>
        <Check 
          value={true} 
          onClick={() => onChange(AxisType.Y_AXIS)}
        > 
          Y軸
        </Check>
      </div>
    )
  }
}

export interface IProps {
  correlation: ICorrelation
  targetSet: {[id:string]: ITarget}
  traceSet: {[id:string]: ITrace}
  onAxisChange: (id:string, axisType: AxisType) => void
  onClose: (id:string ) => void
  onScatter: (id:string) => void
  onRangeChange: (id:string, fromDate: string, toDate:string) => void
  onCopy: (id:string) => void
  onDeleteTrace: (id:string, traceId:string) => void
  onSelect: (id: string) => void
  onFromDateChange: (id:string, datetime:string) => void
  onToDateChange: (id:string, datetime:string) => void
}
export default class CorrelationPlot extends React.Component<IProps> {
  getTraces = ():ITrace[] => {
    return fp.filter((x:any) => !fp.isNil(x))([...this.getYTraces(), this.getXTrace()!]) 
  }
  getLegends = () => {
    const { targetSet } = this.props
    return fp.pipe(
      fp.map((x:ITrace) => {
        console.info(x.id);
        return {
          id: x.id,
          name: targetSet[x.targetId]!.name
        }
      }),
      fp.filter((x:{id:string, name?:string}) => Boolean(x.name)),
      fp.uniqBy(x => x.id),
    )(this.getTraces())
  }
  getYTraces = ():ITrace[] => {
    const { correlation, traceSet } = this.props
    return correlation.yTraceIds
      .map(x => traceSet[x])
      .filter(x => !fp.isNil(x));
  }
  getXTrace = (): ITrace|undefined => {
    const { correlation, traceSet } = this.props
    return traceSet[correlation.xTraceId!]
  }


  getPlotData = () => {
    const yTraces = this.getYTraces()
    const xTrace = this.getXTrace()
    const { correlation, targetSet } = this.props

    if(xTrace && (yTraces.length > 0)){
      return fp.map((yTrace: ITrace) => {
        const target = targetSet[yTrace.targetId];
        const traceIdx = fp.findIndex(yTrace)(yTraces);
        const data = {
          x: xTrace.points.map(t => t.value),
          y: yTrace.points.map(t => t.value),
          mode: correlation.isScatter ? "markers" : "lines",
          type: 'scattergl',
          name: !fp.isNil(target.unit) ? `${target.name} (${target.unit})` : target.name,
        }
        return data;
      })(yTraces);
    }else{
      return []
    }
  }

  getPlotLayout = () => {
    const {correlation} = this.props
    return {
      showlegend: false,
      margin: {
        r: 5,
        t: 5,
        b: 30,
        l: 50,
      },
      xaxis: {
        fixedrange: true,
      },
      yaxis: {
        title: {
          font: {
            size: 12,
          },
        },
        fixedrange: true,
      },
    }
  }
  render = () => {
    const {
      correlation,
      onRangeChange,
      onClose,
      onScatter,
      onCopy,
      onDeleteTrace,
      onSelect,
      onAxisChange,
      onFromDateChange,
      onToDateChange,
    } = this.props
    return (
      <Layout onClick={() => onSelect(correlation.id)}>
        <FinderArea>
          <RangeDatetimeInput
            fromDate={correlation.fromDate}
            toDate={correlation.toDate}
            onFromDateChange={x => onFromDateChange(correlation.id, x)}
            onToDateChange={x => onToDateChange(correlation.id, x)}
            onSubmit={(x, y) => onRangeChange(correlation.id, x, y)}
          />
        </FinderArea>

        <CloseArea>
          <a className="delete" onClick={() => onClose(correlation.id)}></a>
        </CloseArea>

        <CopyArea>
          <a className="button" onClick={() => onCopy(correlation.id)}>
            copy
          </a>
        </CopyArea>


        <SwitchArea>
          <Check 
            value={correlation.isScatter}
            onClick={() => onScatter(correlation.id)}
          >
            <span> Scatter </span>
          </Check>
        </SwitchArea>

        <SelectArea>
          <AxisSwitch 
            axisType={correlation.inputAxisType}
            onChange={x => onAxisChange(correlation.id, x)}
          />
        </SelectArea>

        <PlotArea>
          <Plot 
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            data={this.getPlotData()}
            layout={this.getPlotLayout()}
          />
        </PlotArea>

        <TagsArea className="field is-grouped is-grouped-multiline">
          {
            this.getLegends().map(x => (
              <div
                key={x.id}
                className="control"
              >
                <div className='tags has-addons' >
                  <span className='tag is-primary'>{x.name}</span>
                  <a
                    className='tag is-delete'
                    onClick={() => onDeleteTrace(correlation.id, x.id)}
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
