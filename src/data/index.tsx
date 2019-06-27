import * as d3 from 'd3';
import { CATemp } from './CA_temp';
export * from './CA_temp';

export const DEFAULT_DATA: DataPoint[] = CATemp;

export interface DataPoint {
  x: number;
  y: number;
  className?: string;
}
export function toDataPoints(x: number[], y: number[]): DataPoint[] {
  return x.map((xi, i) => ( {x: xi, y: y[i]} ))
}

export type DataSet = ReturnType<typeof DataSet>;
export function DataSet (data: DataPoint[]) {
  return {
    data,
    x: DataVector(data.map(d => d.x)),
    y: DataVector(data.map(d => d.y)),
  }
}

export type DataVector = ReturnType<typeof DataVector>;
export function DataVector(data: number[]) {
  return {
    data,
    domain: d3.extent(data) as number[],
    min: d3.min(data) as number,
    max: d3.max(data) as number,
  }
}
