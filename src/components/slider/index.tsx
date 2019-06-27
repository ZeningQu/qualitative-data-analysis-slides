import React from 'react';
require('./slider.scss');

export interface SliderProps {
  instruction?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (newValue: number) => any;
}

export class Slider extends React.PureComponent<SliderProps> {
  constructor(props: SliderProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const {value, min, max, step} = this.props;
    return(
      <div className="slider-container">
        <span className="instruction">{this.props.instruction}</span>
        <input type="range" min={min} max={max} value={value} step={step} className="slider" onChange={this.handleChange} />
        <span className="value">{this.props.value}</span>
      </div>);
  }

  private handleChange(event: any) {
    this.props.onChange(Number(event.target.value));
  }
}
