import * as d3 from 'd3';
import React, { FunctionComponent as FC } from 'react';
require('./axis.scss');

interface AxisProps {
  transform?: string;
  generator: typeof d3.axisLeft | typeof d3.axisRight | typeof d3.axisTop | typeof d3.axisBottom;
  scale: any;
  tickSize: number;
  tickFormat?: any;
}

export const Axis: FC<AxisProps> = ({
  generator, scale, children,
  transform = `translate(0,0)`,
  tickSize = 0,
  tickFormat = d3.format('d')
}) => {
  const axis = generator(scale)
    .ticks(7)
    .tickSize(tickSize)
    .tickFormat(tickFormat);
  return <g className='axis' transform={transform} ref={el => render(el, axis)}>
    {children}
  </g>
}

const render = (el: any, axis: any) => {
  if (!el) return;
  d3.select(el).call(axis);
}
