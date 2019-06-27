import React, { FunctionComponent as FC } from 'react';
import { Lines } from './index';
import { DataPoint, DataSet, toDataPoints } from '../../../data';
import { PolyModel, isPolyModel } from '../../ml';
import { initializeArrayWithRange } from '../../util';

interface RegressionLineProps {
  data: DataPoint[],
  model: PolyModel | Error,
  xScale: any,
  yScale: any,
}

export const RegressionLine: FC<RegressionLineProps> = ({
  data, model, xScale, yScale
}) => {
  const { x } = DataSet(data);
  let regressionData: DataPoint[] = [];
  if ( isPolyModel(model) ) {
    const xPath = initializeArrayWithRange(x.max, x.min, 1);
    const yPath = model.predict(xPath);
    regressionData = toDataPoints(xPath, yPath);
  }
  return <Lines data={[regressionData]} {...{xScale, yScale}}/>
}
