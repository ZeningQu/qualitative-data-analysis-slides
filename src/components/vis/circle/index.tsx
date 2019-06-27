import * as d3 from 'd3';
import React, { FunctionComponent as FC } from 'react';
import { DataPoint } from "../../../data";
require('./circle.scss');

interface CircleProps {
  data: DataPoint[],
  xScale: any,
  yScale: any,
}

export const Circles: FC<CircleProps> = p => {
  return <g className='circles' ref={el => render(el, p.data, p.xScale, p.yScale)}/>
}

const render = (el:any, data: DataPoint[], xScale: any, yScale: any) => {
  if (!el) return;
  const update = d3.select(el).selectAll("circle")
    .data(data);

  update.enter().append("circle")
    .attr("r", '1%')
    .attr("cx", (d:any) => xScale(d.x))
    .attr("cy", (d:any) => yScale(d.y))
    .attr('class', (d:any)=> d.className || '');

  update.exit().remove();
}
