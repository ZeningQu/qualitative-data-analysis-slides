import React, { FunctionComponent } from 'react';
import { ResponsiveSVGContainer, DEFAULT_CONTAINER_WIDTH, DEFAULT_CONTAINER_HEIGHT,
  Margin, DEFAULT_MARGIN, 
  Euclidean } from '..';
import { Circles } from '../circle';
import { DEFAULT_DATA, DataPoint, DataSet } from '../../../data';
import { createScale, xRange, yRange } from '../axis';
import { innerDimension } from '../dimension';
import { PolyModel } from '../../ml';
import { RegressionLine } from '../line';

interface ScatterProps {
  width?: number;
  height?: number;
  margin?: Margin;
  data?: DataPoint[];
  showRegressionLine?: boolean;
  model: PolyModel | Error;
}

export const ScatterPlot: FunctionComponent<ScatterProps> = ({
  width = DEFAULT_CONTAINER_WIDTH,
  height = DEFAULT_CONTAINER_HEIGHT,
  margin = DEFAULT_MARGIN,
  data = DEFAULT_DATA,
  showRegressionLine = true,
  model,
}) => {
  const { w, h } = innerDimension(width, height, margin);
  const { x, y } = DataSet(data);
  const xScale = createScale(x.domain, xRange(w));
  const yScale = createScale(y.domain, yRange(h));
  
  return <ResponsiveSVGContainer>  
    <Euclidean {...{xScale, yScale}}/>
    <Circles {...{data, xScale, yScale}}/>
    {showRegressionLine && <RegressionLine {...{data, model, xScale, yScale}}/>}
  </ResponsiveSVGContainer>
}
