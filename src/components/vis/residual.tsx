// import { newLine } from "./line";

export interface ResidualProps {
  className: string;
  coord: any;
  data: {x: number[], y: number[], yhat: number[]}
}

// export function newResidual(props: ResidualProps) {
//   const { className, data, coord } = props;
//   const { x, y, yhat } = data;
//   const { origin } = props.coord;

//   origin.g.selectAll('.' + className).remove();
//   x.map((xi, i) => {
//     newLine({className, coord, eraseOld: false,
//       data: [{x: xi, y: y[i]}, {x: xi, y: yhat[i]}]})
//   })
// }

// export function eraseResidual(props: {coord: any, className: string}) {
//   const { origin } = props.coord;
//   origin.g.selectAll('.' + props.className).remove();
// }
