import * as d3 from 'd3';
import React, { FunctionComponent as FC } from 'react';
import { DEFAULT_INNER_WIDTH, DEFAULT_INNER_HEIGHT } from '../svg-container';
import { Axis, XTitle, YTitle } from '../axis';
import { Dimension } from '..';

interface XYProps {
  dimension?: Dimension;
  title: string;
  scale: any;
  tickFormat?: any;
  tickSize?: number;
}

export const XAxis: FC<XYProps> = ({
  title, scale,
  dimension = { w: DEFAULT_INNER_WIDTH, h: DEFAULT_INNER_HEIGHT },
  tickFormat = d3.format('d'),
  tickSize = DEFAULT_INNER_HEIGHT
}) => (
  <Axis {...{scale, tickSize, tickFormat}} generator={d3.axisBottom}>
    <XTitle {...dimension}>{title}</XTitle>
  </Axis>
)


export const YAxis: FC<XYProps> = ({
  title, scale,
  dimension = { w: DEFAULT_INNER_WIDTH, h: DEFAULT_INNER_HEIGHT },
  tickFormat = d3.format('d'),
  tickSize = DEFAULT_INNER_WIDTH,
}) => (
  <Axis {...{scale, tickSize, tickFormat}} generator={d3.axisLeft} transform={`translate(${dimension.w})`}>
    <YTitle {...dimension}>{title}</YTitle>
  </Axis>
)
