import * as d3 from 'd3';
import { DataPoint, DataSet } from '../../../data';

export function createScale(domain: number[], range: number[], log = false) {
  const scale = log? d3.scaleLog() : d3.scaleLinear();
  return scale.domain(domain)
    .nice()
    .range(range);
}

export const xDomain = (data: DataPoint[]) => DataSet(data).x.domain;
export const yDomain = (data: DataPoint[]) => DataSet(data).y.domain;

export const xRange = (w: number) => [0, w];
export const yRange = (h: number) => [h, 0]
