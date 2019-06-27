// import * as d3 from 'd3';
// import React from 'react';
// import { Code, Slider, Title, blockEquation } from "..";
// import { Margin } from '../plot';
// import { VisController } from './vis-controller';
// require('./regression.scss');

export type Scene = 'basic' | 'cv' | 'loocv' | 'k-fold';

// export interface RegressionProps {
//   title: string;
//   scene: Scene;
//   margin?: Margin;
//   data?: any[];
// }

// export interface RegressionState {
//   actIdx: number;
//   model: string;
//   hyperparameter: {
//     name: string;
//     value: number;
//     min: number;
//     max: number;
//     step: number;
//   }
// }

// export class Regression extends React.PureComponent<RegressionProps, RegressionState> {
//   private visContainer?: SVGElement | null;

//   private visController?: VisController | null;

//   private actionsByScene: {[key: string]: string[]} = {
//     'cv': [
//       'init', // no controls, plot raw data
//       'split-code', // show split controls,randomly split data into train, val, and test sets
//       'split-scatter', // show split scatter plots
//       'split-stick', // show stick plot
//       'tune', // show tuning slider
//       'mse', // show mse equation
//       'pick' // pick the best fit
//     ]
//   }

//   private actions: string[];

//   private splitCode =
// `X_train, X_test, y_train, y_test
//   = train_test_split(X, y)
// X_train, X_val, y_train, y_val
//   = train_test_split(X_train, y_train)`;

//   private mseEq = `MSE = 
//     \\class{average}{ \\frac{1}{n} \\sum \\limits_{i=1}^n }
//     ( \\class{residual}{y_i - \\widehat{y}_i} 
//     )^\\class{square}{2}`;

//   constructor(props: RegressionProps) {
//     super(props);
//     this.state = {
//       actIdx: 0,
//       model: 'poly',
//       hyperparameter: { name:'degree', value: 1, min: 0, max: 40, step: 1 }
//     }
//     this.actions = this.actionsByScene[this.props.scene] || [];
//     this.getDisplay = this.getDisplay.bind(this);
//     this.handleHyperParameterChange = this.handleHyperParameterChange.bind(this);
//     this.handleKeyDown = this.handleKeyDown.bind(this);
//   }

//   render() {
//     const {controls, vis} = this.getDisplay();
//     return (   
//       <>
//         {controls}
//         {vis}
//       </>
//     )
//   }

//   componentDidMount() {
//     this.visController = new VisController({ container: this.visContainer! }).render();
//     if (this.props.scene === 'basic') {
//       this.visController.fit(this.state.hyperparameter.value);
//     }
    
//     if (this.props.scene === 'cv') {
//       document.addEventListener("keydown", this.handleKeyDown);
//     }
    
//   }

//   componentWillUnmount(){
//     if (this.props.scene === 'cv') {
//       document.removeEventListener("keydown", this.handleKeyDown);
//     }
//   }

//   componentDidUpdate() {
//     switch (this.props.scene) {
//       case 'basic':
//         this.visController!.fit(this.state.hyperparameter.value);
//         break;

//       case 'cv':
//         if (this.state.actIdx >= this.actions.indexOf('tune')) {
//           this.visController!.fit(this.state.hyperparameter.value, ['train', 'val']);
//         }
//         if (this.state.actIdx >= this.actions.indexOf('mse')) {
//           this.visController!.scoreMSE(this.state.hyperparameter.value);
//         }
//         break;
//     }
//   }

//   private getDisplay() {
//     let controls: JSX.Element;
//     let vis: JSX.Element;

//     const {value, min, max, step} = this.state.hyperparameter;

//     switch (this.props.scene) {
//       case 'cv':
//         controls = <div className="top-bottom-split control-panel small-font">
//           <div className={this.visible('split-code')}>
//             <span>
//               Split data into
//               <span className='train'> train, </span>
//               <span className='validation'> validation, </span>
//               and
//               <span className='test'> test </span>
//               set
//             </span>
//             <div className="tiny-font">
//               <Code code={this.splitCode} />
//             </div>
//           </div>

//           <div className={this.visible('tune')}>
//             <span>
//               Fit a model on the
//               <span className='train'> train </span>
//               set
//             </span>
//             <Slider instruction={`Tune this hyperparameter`}
//               min={min} max={max} value={value} step={step}
//               onChange={this.handleHyperParameterChange}/>
//           </div>

//           <div className={this.visible('mse')}>
//             <span>
//               Measure the Mean-Squared Error on
//               <span className='train'> train </span>
//               and
//               <span className='validation'> validation </span>
//             </span>
//             {blockEquation(this.mseEq)}
//           </div>
//         </div>;

//         vis = <svg ref={ref => (this.visContainer=ref)}/>;
//         break;


//       case 'basic':
//       default:
//         controls =
//         <div className="top-bottom-split control-panel fix-first">
//           <Slider instruction={`Tune this hyperparameter`}
//           min={min} max={max} value={value} step={step}
//           onChange={this.handleHyperParameterChange}/>
//         </div>;
//         vis = <svg ref={ref => (this.visContainer=ref)}/>;
//     }

//     return {controls, vis};
//   }

//   private visible(a: string) {
//     return this.actions.indexOf(a) <= this.state.actIdx ? '' : 'hidden';
//   }

//   private handleHyperParameterChange(newValue: number) {
//     this.setState((prevState: RegressionState) => ({
//         ...prevState,
//         hyperparameter: {
//           ...prevState.hyperparameter,
//           value: newValue }
//       }))
//   }

//   private handleKeyDown(event: any) {
//     if (this.actions.length === 0) { return; }

//     if (event.keyCode === 38) { // up arrow
//       this.setState((prev: RegressionState) => ({
//         ...prev,
//         actIdx: Math.max(prev.actIdx-1, 0)
//       }));
//     }

//     if (event.keyCode === 40) { // down arrow
//       this.setState((prev: RegressionState) => ({
//         ...prev,
//         actIdx: Math.min(prev.actIdx+1, this.actions.length-1)
//       }))

//       const currentAction = this.actions[this.state.actIdx];
//       switch (currentAction) {
//         case 'split-scatter':
//           this.visController!.randomSplit();
//           break;

//         case 'split-stick':
//           break;

//         case 'mse':
//           this.visController!.scoreMSE(this.state.hyperparameter.value);
//           d3.select('.residual')
//             .on('mouseenter', () => {
//               this.visController!.drawResidual();
//             })
//             .on('mouseleave', () => {
//               this.visController!.eraseResidual();
//             })
//           break;
//       }
//     }
//   }
// }
