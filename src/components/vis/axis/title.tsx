import React, { FunctionComponent as FC } from 'react';
import { Dimension } from '..';

export const XTitle: FC<Dimension> = p => 
  <text className='title' x={p.w} y={p.h-6} textAnchor='end'>{p.children}</text>

export const YTitle: FC<Dimension> = p => 
  <text className='title' x={6-p.w} y='1em' textAnchor='start'>{p.children}</text>
