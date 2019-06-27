import React, { FunctionComponent as FC } from 'react';
import { Margin, DEFAULT_MARGIN } from '../margin';
import { Dimension, innerWidth, innerHeight } from '../dimension';
import { Transform } from '../transform';
require('./svg-container.scss');

export const DEFAULT_CONTAINER_WIDTH = 1000;
export const DEFAULT_CONTAINER_HEIGHT = 1000;
export const DEFAULT_INNER_WIDTH = innerWidth(DEFAULT_CONTAINER_WIDTH, DEFAULT_MARGIN);
export const DEFAULT_INNER_HEIGHT = innerHeight(DEFAULT_CONTAINER_HEIGHT, DEFAULT_MARGIN);

interface ContainerProps {
  dimension?: Dimension;
  margin?: Margin;
}

export const ResponsiveSVGContainer: FC<ContainerProps> = ({
  dimension = {w: DEFAULT_CONTAINER_WIDTH, h: DEFAULT_CONTAINER_HEIGHT},
  margin = DEFAULT_MARGIN,
  children,
}) => {
  const { w, h } = dimension;
  const { left, top } = margin;

  return (
    <svg className='full-svg-container'>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio={'xMidYMid meet'}>
        <Transform x={left} y={top}>
          {children}
        </Transform>
      </svg>
    </svg>
  )
}
