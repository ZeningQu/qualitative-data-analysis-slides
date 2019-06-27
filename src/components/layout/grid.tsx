import React, { FunctionComponent as FC } from 'react';
require('./grid.scss');

export const Grid = ({ children }: any) => (
  <div className="grid-container">
    {children}
  </div>
);

export const Title = ({ text }: any) => <h2 className="title">{text}</h2>

export const Body = ({ children }: any) => <div className="body">{children}</div>

export const LeftGolden: FC<{position?: string}> = ({position, children}) => 
  <div className={position ? `${position}-left-golden` : 'left-golden'}>{children}</div>

export const RightGolden = ({ children }: any) => <div className="right-golden">{children}</div>
