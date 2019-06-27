import * as d3 from 'd3';
import React, { FunctionComponent as FC } from 'react';
import { DataPoint } from '../../../data';
import { uniqueElementsBy, orderBy } from '../../util';
require('./line.scss');

export * from './regression-line';

interface LinesProps {
  data: DataPoint[][],
  xScale: any,
  yScale: any,
}

export const Lines: FC<LinesProps> = props =>
  <g className='lines' ref={el => render(el, props)} />
  
const render = (el: any, props: LinesProps) => {
  if (!el) return;

  const { data, xScale, yScale } = props;
  const update = d3.select(el).selectAll('path')
    .data(data)
    .attr("d", path(xScale, yScale));;

  update.enter().append('path')
    .attr("d", path(xScale, yScale));

  update.exit().remove();
}

export const path = (xScale: any, yScale: any) => d3.line<DataPoint>()
  .x(d => xScale(d.x))
  .y(d => yScale(d.y));



// export interface LineProps {
//   coord: any,
//   className?: string,
//   data: DataPoint[],
//   eraseOld?: boolean;
// }

// export function newLine(props: LineProps) {
//   const { className, data, eraseOld } = props;
//   const { origin, xScale, yScale } = props.coord;
  
//   if (eraseOld !== false) {
//     origin.g.select('.' + className).remove();
//   }
  
//   origin.g.append("path")
//     .datum(data)
//     .attr("class", className)
//     .attr("d", path(xScale, yScale));
// }



// // add point(s) to a line, return the updated data
// export function addPoint(props: LineProps): DataPoint[] {
//   const { className, data } = props;
//   const line = props.coord.origin.g.select('.' + className);
//   const oldData: DataPoint[] = line.empty() ? [] : line.datum();
//   let newData: DataPoint[] = [...oldData, ...data];
//   newData = uniqueElementsBy(newData, (a: DataPoint, b: DataPoint) => a.x === b.x);
//   newData = orderBy(newData, ['x']);
//   return newData;
// }
