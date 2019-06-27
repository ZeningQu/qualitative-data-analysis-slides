export {}

// export interface VisControllerProps {
//   container: SVGElement,
//   margin?: Margin,
//   data?: VisControllerData,
// }

// export interface VisControllerCoord {
//   raw?: Euclidean;
//   train?: Euclidean;
//   val?: Euclidean;
//   mse?: Euclidean;
//   [key:string]: Euclidean | undefined;
// }

// export interface VisControllerData {
//   readonly raw: any[];
//   train?: any[];
//   val?: any[];
//   test?: any[];
//   [key:string]: any[] | undefined;
// }

// export class VisController {
//   readonly container: SVGElement;

//   readonly margin: Margin;

//   private data: VisControllerData;
//   private dataDomainX: number[];
//   private dataDomainY: number[];

//   private model?: any;

//   // root svg canvas
//   private svg?: d3.Selection<any, any, any, any>;

//   // layers for the coordinate systems
//   private coord: VisControllerCoord = {};

//   // a layer for the flying circles
//   private circles?: d3.Selection<any, any, any, any>;

//   // mse score and data
//   private score?: any;

//   constructor(props: VisControllerProps) {
//     this.container = props.container;
//     this.margin = props.margin || DEFAULT_MARGIN;
//     this.data = props.data || { raw: CATemp };
//     this.dataDomainX = d3.extent(d3.values(this.data.raw.map(d=>d.year))) as number[];
//     this.dataDomainY = d3.extent(d3.values(this.data.raw.map(d=>d.value))) as number[];
//   }

//   public render() {
//     const minEdge = getMinEdge(this.container)
//     this.svg = appendSquareSVG(this.container, minEdge);

//     this.coord.raw = newEuclidean({
//       className: 'coord-raw',
//       container: {
//         svg: this.svg,
//         width: minEdge,
//         height: minEdge,
//       },
//       margin: this.margin,
//       x: {
//         domain: this.dataDomainX,
//         title: 'Year',
//         tickFormat: d3.format('d'),
//       },
//       y: {
//         domain: this.dataDomainY,
//         title: 'CA Temperature',
//         tickFormat: d3.format('d'),
//       }
//     });

//     this.coord.train = newEuclidean({
//       className: 'coord-train hidden',
//       container: {
//         svg: this.svg,
//         width: minEdge/2,
//         height: minEdge/2,
//       },
//       margin: this.margin,
//       x: {
//         domain: this.dataDomainX,
//         title: 'Year',
//         tickFormat: d3.format('d'),
//       },
//       y: {
//         domain: this.dataDomainY,
//         title: 'CA Temperature',
//         tickFormat: d3.format('d'),
//       }
//     });

//     this.coord.val = newEuclidean({
//       className: 'coord-val hidden',
//       container: {
//         svg: this.svg,
//         width: minEdge/2,
//         height: minEdge/2,
//       },
//       margin: this.margin,
//       transform: { x: minEdge/2, y: 0 },
//       x: {
//         domain: this.dataDomainX,
//         title: 'Year',
//         tickFormat: d3.format('d'),
//       },
//       y: {
//         domain: this.dataDomainY,
//         title: 'CA Temperature',
//         tickFormat: d3.format('d'),
//       }
//     });

//     this.coord.mse = newEuclidean({
//       className: 'coord-mse hidden',
//       container: {
//         svg: this.svg,
//         width: minEdge/2,
//         height: minEdge/2,
//       },
//       margin: this.margin,
//       transform: { x: minEdge/4, y: minEdge/2 },
//       x: {
//         domain: [0,40],
//         title: 'Hyperparameter',
//         tickFormat: d3.format('d'),
//       },
//       y: {
//         domain: [0.1,10],
//         log: true,
//         title: 'MSE',
//         tickFormat: d3.format('.1f'),
//       }
//     });

//     this.circles = this.svg.append("g")
//       .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
//       .attr("class", 'mark-circle');

//     this.circles.selectAll("circle")
//       .data(this.data.raw)
//     .enter().append("circle")
//       .attr("r", '1%')
//       .attr("cx", (d:any) => this.coord.raw!.xScale!(d.year))
//       .attr("cy", (d:any) => this.coord.raw!.yScale!(d.value));

//     return this;
//   }

//   public fit(hvalue: number, coords: string[] = ['raw']) {
//     coords.forEach((c: string) => {
//       if (!this.coord[c]) { return; }
//       const coord: Euclidean = this.coord[c]!;
//       const data: any[] = (c==='raw'? this.data.raw : this.data.train) || [];

//       const x: number[] = data.map( d => d.year );
//       const y: number[] = data.map( d => d.value );
//       const degree = hvalue;
//       try {
//         this.model = new PolynomialRegression(x, y, degree);
//       }
//       catch(e) {
//         console.log(e);
//       }
      

//       const xPath = initializeArrayWithRange(this.dataDomainX[1], this.dataDomainX[0], 1);
//       const yPath = this.model.predict(xPath);

//       // console.log(this.model.coefficients);
//       // console.log(this.model.toString(3)); 
//       // console.log(this.model.toLaTeX());

//       const lineGenerator = d3.line()
//       .x(d => coord.xScale!(d[0]))
//       .y(d => coord.yScale!(d[1]));

//       const origin = coord.origin!;
//       origin.g.selectAll(".regression").remove();

//       origin.g.datum(unzip([xPath, yPath]))
//         .append("path")
//         .attr("class", "regression")
//         .attr("d", lineGenerator);
//     })
//     return this;
//   }

//   public randomSplit() {
//     const svg = d3.select(this.container);

//     svg.selectAll('.coord-raw').classed('hidden', true);

//     const rdn = d3.shuffle(d3.range(118));
//     this.data.train = this.data.raw.filter((d: any, i: number) => rdn.indexOf(i) <= 93);
//     this.data.val = this.data.raw.filter((d: any, i: number) => ((rdn.indexOf(i) > 93) && (rdn.indexOf(i) <= 105)));
//     this.data.val = this.data.raw.filter((d:any, i:number) => rdn.indexOf(i) > 105);
//     svg.selectAll('circle')
//       .transition()
//   	  .duration(1000)
//       .attr('class', (d:any, i:number) => {
//         if (rdn.indexOf(i) <= 93) { // training set
//           return 'train';
//         }
//         if (rdn.indexOf(i) <= 105) { // validation set
//           return 'validation';
//         }
//         return 'test';
//       })
//       .transition()
//       .duration(1000)
//       .attr('cx', (d:any, i:number) => {
//         if (rdn.indexOf(i) <= 93) { // training set
//           return this.coord.train!.xScale!(d.year) + this.coord.train!.origin.transform.x;
//         }
//         if (rdn.indexOf(i) <= 105) { // validation set
//           return this.coord.val!.xScale!(d.year) + this.coord.val!.origin.transform.x;
//         }
//         return $(this.container).width();
//       })
//       .attr('cy', (d:any, i:number) => {
//         if (rdn.indexOf(i) <= 93) { // training set
//           return this.coord.train!.yScale!(d.value) + this.coord.train!.origin.transform.y;
//         }
//         if (rdn.indexOf(i) <= 105) { // validation set
//           return this.coord.val!.yScale!(d.value) + this.coord.val!.origin.transform.y;
//         }
//         return 0;
//       })
//       .on("end", () => {
//         svg.selectAll('.coord-train').classed('hidden', false);
//         svg.selectAll('.coord-val').classed('hidden', false);
//       });

//     return this;
//   }

//   public scoreMSE(hvalue: number) {
//     if (!this.coord.mse || !this.model || !this.data.train || !this.data.val) { return; }

//     const svg = d3.select(this.container);
//     svg.selectAll('.coord-mse').classed('hidden', false);
//     const coord = this.coord.mse!;

//     const x_train: number[] = this.data.train.map(d => d.year);
//     const y_train: number[] = this.data.train.map(d => d.value);
//     const y_hat_train: number[] = this.model.predict(x_train);
//     const mse_train = mse(y_train, y_hat_train);

//     const x_val: number[] = this.data.val.map(d => d.year);
//     const y_val: number[] = this.data.val.map(d => d.value);
//     const y_hat_val: number[] = this.model.predict(x_val);
//     const mse_val = mse(y_val, y_hat_val);
    
//     newCircles({coord, data: [
//       { x: hvalue, y: mse_train, className: 'train'},
//       { x: hvalue, y: mse_val, className: 'validation'}
//     ]})

//     const trainPath = addPoint({className: 'train-mse', data: [{ x: hvalue, y: mse_train }], coord})
//     newLine({className: 'train-mse', data: trainPath, coord})
    
//     const valPath = addPoint({className: 'val-mse', data: [{ x: hvalue, y: mse_val }], coord})
//     newLine({className: 'val-mse', data: valPath, coord})

//     this.score = {
//       train: {
//         mse: mse_train,
//         x: x_train,
//         y: y_train,
//         yhat: y_hat_train
//       },
//       val: {
//         mse: mse_val,
//         x: x_val,
//         y: y_val,
//         yhat: y_hat_val,
//       }
//     }
//   }

//   public drawResidual() {
//     newResidual({ className: 'residual-stick', coord: this.coord.train!, data: this.score.train })
//   }

//   public eraseResidual() {
//     eraseResidual({ coord: this.coord.train!, className: 'residual-stick' });
//   }
// }
