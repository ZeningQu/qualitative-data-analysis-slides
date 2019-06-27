import React, { useState, FunctionComponent as FC, ReactNode } from 'react';
import { DEFAULT_DATA, DataPoint, DataSet } from '../data';
import { PolyRegression, PolyModel } from '../components/ml';

export const TRAIN = () => <span className="train"> TRAIN </span>;
export const Train = () => <span className="train"> Train </span>;
export const train = () => <span className="train"> train </span>;

export const VAL = () => <span className="validation"> VAL </span>;
export const Val = () => <span className="validation"> Validation </span>;
export const val = () => <span className="validation"> validation </span>;

export const FUTURE = () => <span className="validation"> FUTURE UNSEEN </span>;

export const TEST = () => <span className="test"> TEST </span>;
export const Test = () => <span className="test"> Test </span>;
export const test = () => <span className="test"> test </span>;

export const Poly = React.createContext({});

export interface PolyProps {
  defaultDegree?: number; 
  data?: DataPoint[];
  children: (context: any) => ReactNode;
}

export const PolyContext: FC<PolyProps> = ({
  defaultDegree = 1,
  data = DEFAULT_DATA,
  children,
}) => {
  const { x, y } = DataSet(data)
  const m: PolyModel | Error = PolyRegression(defaultDegree).fit(x.data, y.data)

  const [degree, updateDegree] = useState(defaultDegree)
  const [model, updateModel] = useState(m)

  const context = {
    degree, 
    model,
    fit: (newDegree: number) => {
      updateDegree(newDegree);
      updateModel(PolyRegression(newDegree).fit(x.data, y.data));
    }
  }

  return (
    <Poly.Provider value={context}>
      <Poly.Consumer>
        {children}
      </Poly.Consumer>
    </Poly.Provider>
  )
}
