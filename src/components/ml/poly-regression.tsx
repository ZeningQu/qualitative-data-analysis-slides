import { PolynomialRegression } from 'ml-regression';

export interface PolyModel {
  predict: (x: number[]) => number[];
  coefficients: number;
  toString: (n: number) => string;
  toLaTeX: any;
}

export function PolyRegression(degree: number) {
  return {
    degree,
    fit: (x: number[], y: number[]) => PolyRegressionFit(x, y, degree),
  }
}

export function PolyRegressionFit(x: number[], y: number[], degree: number): PolyModel | Error {
  try {
    return new PolynomialRegression(x, y, degree);
  }
  catch(e) {
    console.error(e);
    return new Error(e)
  }
}

export function isPolyModel(m: PolyModel | Error): m is PolyModel {
  return (m as PolyModel).predict !== undefined;
}
