import React from 'react';

export const DEFAULT_TRANSFORM: TransformProps = { x: 0, y: 0 };

export interface TransformProps {
  x: number;
  y: number;
  children?: any;
}

export const Transform = (props: TransformProps) => (
  <g transform={`translate(${props.x}, ${props.y})`}>
    {props.children}
  </g>
);
