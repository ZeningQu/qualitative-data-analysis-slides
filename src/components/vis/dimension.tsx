import { Margin } from "./margin";

export interface Dimension {
  w: number;
  h: number;
}

export const innerWidth = (width: number, margin: Margin) => width - margin.left - margin.right;
export const innerHeight = (height: number, margin: Margin) => height - margin.top - margin.bottom;

export function innerDimension(width: number, height: number, margin: Margin): Dimension {
  return {
    w: innerWidth(width, margin),
    h: innerHeight(height, margin),
  }
}
