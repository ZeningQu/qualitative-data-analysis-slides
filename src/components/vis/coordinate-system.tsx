import React, { FunctionComponent as FC } from 'react';
import { XAxis, YAxis } from './axis';
import { DEFAULT_INNER_WIDTH, DEFAULT_INNER_HEIGHT } from './svg-container';
import { Dimension } from './dimension';

export interface EuclideanProps {
  dimension?: Dimension;
  xScale: any;
  yScale: any;
}

export const Euclidean: FC<EuclideanProps> = ({
  dimension = {w: DEFAULT_INNER_WIDTH, h: DEFAULT_INNER_HEIGHT},
  xScale, yScale,
}) => {
  return (
    <>
      <XAxis {...dimension} scale={xScale} title='Year' />
      <YAxis {...dimension} scale={yScale} title='Temperature' />
    </>
  )
}
