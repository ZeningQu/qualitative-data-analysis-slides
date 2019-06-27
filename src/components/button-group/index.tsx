import React from 'react';
require('./button-group.scss');

export interface ButtonGroupProps {
  values: string[];
}

export class ButtonGroup extends React.PureComponent<ButtonGroupProps> {
  render() {
    return (
      <div className="btn-group">
        {this.props.values.map((v: string) => 
          <button className="button">{v}</button>
          )}
      </div>
    );
  }
}
